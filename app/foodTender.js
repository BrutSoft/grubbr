import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Container, Content, DeckSwiper, Title, Header, Icon, Button, View, Card, CardItem, Thumbnail, Text, ListItem, Spinner } from 'native-base';

import { openDrawer } from './actions/drawer';
import { replaceRoute, popRoute, pushNewRoute } from './actions/route';
import { setIndex } from './actions/list';
import { setCurrentDish, setTenderIndex, setTenderData } from './actions/search';
import styles from './components/login/styles';

// TODO: I think we can do a fetch here before this component loads.  Currently it
// grabs tenderData before the main.js component mounts and saves to redux state.
// I think the previous error was caused because an anonymous function is needed
// for onSwipeLeft or onSwipeRight.

class Tender extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    replaceRoute: React.PropTypes.func,
    pushNewRoute: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    setIndex: React.PropTypes.func,
    setCurrentDish: React.PropTypes.func,
    setTenderIndex: React.PropTypes.func,
    setTenderData: React.PropTypes.func,
    tenderData: React.PropTypes.array,
    tenderIndex: React.PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
    }
  }

  componentWillMount() {
    if (this.props.tenderData.length === 0) {
      this.getTenderData();
    } else {
      this.setState({
        loading: false,
      })
    }
  }

  setTenderData(data) {
    this.props.setTenderData(data);
  }

  getTenderData() {
    const that = this;
    fetch('https://grubbr-api.herokuapp.com/v1/tender')
    .then(response => response.json()
    )
    .then((responseJson) => {
      that.setTenderData(responseJson.data);
      that.setState({
        loading: false,
      })
    })
    .catch(() => {
      that.setState({
        error: true,
      })
    });
  }

  setCurrentDish(dish) {
    this.props.setCurrentDish(dish);
  }

  setTenderIndex(index) {
    this.props.setTenderIndex(index);
  }

  replaceRoute(route) {
    this.props.replaceRoute(route);
  }

  pushNewRoute(route, index) {
    this.props.setIndex(index);
    this.props.pushNewRoute(route);
  }

  popRoute() {
    this.props.popRoute();
  }

  render() {
    return (
      <Container style={styles.bgColor}>
        <Header>
          <Button transparent onPress={() => this.popRoute()}>
            <Icon name="ios-arrow-back" />
          </Button>

          <Title>Grubbr</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content>
          <View style={styles.padding}>
            <Title style={styles.title}>Tender</Title>
            { this.state.loading ?
              <View>
                <Spinner color="green" />
              </View> :
            <DeckSwiper
              dataSource={this.props.tenderData}
              onSwipeLeft={() => this.setTenderIndex(this.props.tenderIndex + 1)}
              onSwipeRight={() => {
                this.setCurrentDish(this.props.tenderData[this.props.tenderIndex]);
                this.setTenderIndex(this.props.tenderIndex + 1);
                this.pushNewRoute('foodProfile');
              }}
              renderItem={dish =>
                <Card style={styles.card}>
                  <ListItem>
                    <Text>{dish.dishName}</Text>
                    <Text note>{dish.restaurantName}</Text>
                  </ListItem>
                  <CardItem>
                    <Image size={80} source={{ uri: dish.images[0] }} />
                  </CardItem>
                  <CardItem>
                    <Icon name="ios-thumbs-up" />
                    <Text>{dish.upvotes}</Text>
                    <Icon name="ios-thumbs-down" />
                    <Text>{dish.downvotes}</Text>
                  </CardItem>
                </Card>
              }
            />
        }
          </View>
        </Content>

      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    replaceRoute: route => dispatch(replaceRoute(route)),
    pushNewRoute: route => dispatch(pushNewRoute(route)),
    setIndex: index => dispatch(setIndex(index)),
    popRoute: () => dispatch(popRoute()),
    setCurrentDish: dish => dispatch(setCurrentDish(dish)),
    setTenderIndex: index => dispatch(setTenderIndex(index)),
    setTenderData: data => dispatch(setTenderData(data)),
  };
}

function mapStateToProps(state) {
  return {
    name: state.user.name,
    list: state.list.list,
    tenderData: state.search.tenderData,
    tenderIndex: state.search.tenderIndex,
  };
}

export default connect(mapStateToProps, bindAction)(Tender);
