import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Content, ListItem, Title, Header, Icon, Button, Card, CardItem, Thumbnail, Text, List, Image } from 'native-base';

import { openDrawer } from './actions/drawer';
import { replaceRoute, popRoute, pushNewRoute } from './actions/route';
import { setIndex } from './actions/list';
import styles from './components/login/styles';

const defaultImg = 'https://s-media-cache-ak0.pinimg.com/236x/33/04/e3/3304e35f47f81180e8c8b896b5d57332.jpg';

class FoodProfile extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    replaceRoute: React.PropTypes.func,
    pushNewRoute: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    setIndex: React.PropTypes.func,
    results: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      dish: [],
    };
  }

  componentWillMount() {
    const dishID = this.props.results.currentDish.dishID;
    const that = this;
    fetch(`https://grubbr-api.herokuapp.com/v1/score/${dishID}`)
    .then(response => response.json())
    .then((responseJson) => {
      that.setState({
        dish: responseJson.data[0],
      });
    })
    .catch(() => {
      that.setState({
        dish: [],
      });
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

        <Content style={styles.padding}>
          <Card style={styles.card}>
            <CardItem>
              <Text>{this.state.dish.dishName}</Text>
              <Text note>{this.state.dish.restaurant}</Text>
            </CardItem>
            <ListItem>
              <Text>Tastes {this.state.dish.adjective}</Text>
              <Button transparent>
                <Icon name="ios-thumbs-up" />
              </Button>
              <Text>{this.state.dish.upvotes}</Text>
              <Button transparent>
                <Icon name="ios-thumbs-down" />
              </Button>
              <Text>{this.state.dish.downvotes}</Text>
              <Button transparent onPress={() => this.pushNewRoute('addReview')}>
                <Icon name="ios-clipboard" />
                <Text>Write review</Text>
              </Button>
            </ListItem>
            <List
              dataArray={this.state.dish.reviews}
              renderRow={review =>
                <ListItem>
                  <Text style={{ width: 280 }} >{review.review}</Text>
                  <Thumbnail size={80} source={{ uri: review.image || defaultImg }} />
                </ListItem>
              }
            />
          </Card>
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
  };
}

function mapStateToProps(state) {
  return {
    name: state.user.name,
    list: state.list.list,
    results: state.search,
  };
}

export default connect(mapStateToProps, bindAction)(FoodProfile);
