import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Image } from 'react-native';
import { Container, Content, ListItem, Title, Header, Icon, Button, Card, CardItem, Thumbnail, Text, List, View, Spinner } from 'native-base';

import { openDrawer } from './actions/drawer';
import { replaceRoute, popRoute, pushNewRoute } from './actions/route';
import { setIndex } from './actions/list';
import { setCurrentDish } from './actions/search'
import styles from './components/login/styles';

const defaultImg = 'https://s-media-cache-ak0.pinimg.com/236x/33/04/e3/3304e35f47f81180e8c8b896b5d57332.jpg';

class FoodProfile extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    replaceRoute: React.PropTypes.func,
    pushNewRoute: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    setIndex: React.PropTypes.func,
    setCurrentDish: React.PropTypes.func,
    currentDish: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
    };
  }

  componentWillMount() {
    this.getFoodProfile();
  }

  setCurrentDish(dish) {
    this.props.setCurrentDish(dish)
  }

  getFoodProfile() {
    const dishID = this.props.currentDish.dishID;
    const that = this;
    fetch(`https://grubbr-api.herokuapp.com/v1/score/${dishID}`)
    .then(response => response.json()
    )
    .then((responseJson) => {
      that.setCurrentDish(responseJson.data[0]);
      that.setState({
        loading: false,
      })
    })
    .catch(() => {
      that.setState({
        loading: false,
        error: true,
      })
    });
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
        { this.state.loading ?
          <View>
            <Spinner color="green" />
          </View> :
          <Content style={styles.padding}>
            <Card style={styles.card}>
              <CardItem>
                <Text>{this.props.currentDish.dishName}</Text>
                <Text note style={styles.restaurantTitle}>{this.props.currentDish.restaurant}</Text>
              </CardItem>
              <CardItem cardBody>
                <Image
                  source={{ uri: this.props.currentDish.images[0] || defaultImg }}
                />
              </CardItem>

              <ListItem>
                <Text>Tastes {this.props.currentDish.adjective}</Text>
                <Button transparent>
                  <Icon name="ios-thumbs-up" />
                </Button>
                <Text>{this.props.currentDish.upvotes}</Text>
                <Button transparent>
                  <Icon name="ios-thumbs-down" />
                </Button>
                <Text>{this.props.currentDish.downvotes}</Text>
                <Button transparent onPress={() => this.pushNewRoute('addReview')}>
                  <Icon name="ios-clipboard" />
                  <Text>Write review</Text>
                </Button>
              </ListItem>
              <List
                dataArray={this.props.currentDish.reviews}
                renderRow={review =>
                  <ListItem>
                    <Text style={{ width: 280 }} >{review.review}</Text>
                    <Thumbnail size={80} source={{ uri: review.image || defaultImg }} />
                  </ListItem>
                }
              />
            </Card>
          </Content>
        }
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
  };
}

function mapStateToProps(state) {
  return {
    name: state.user.name,
    list: state.list.list,
    currentDish: state.search.currentDish,
  };
}

export default connect(mapStateToProps, bindAction)(FoodProfile);
