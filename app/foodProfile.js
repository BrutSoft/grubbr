import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Container, Content, ListItem, Title, Header, Icon, Button, Card, CardItem, Thumbnail, Text } from 'native-base';

import { openDrawer } from './actions/drawer';
import { replaceRoute, popRoute, pushNewRoute } from './actions/route';
import { setIndex } from './actions/list';

const dishes = [
  {
    name: 'Dish One',
    restaurant: "Antoine's",
    menu_type: 'Appetizers',
    image: require('./img/food_one.png'),
    hearts: '12',
    upvotes: '43',
    downvotes: '9',
    adjective: 'spicy',
    dish_type: 'Thai',
    reviews: [
      'Awesome taste, I will absolutely come back to grab them once again',
    ],
  },
];

class FoodProfile extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    replaceRoute: React.PropTypes.func,
    pushNewRoute: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    setIndex: React.PropTypes.func,
    results: React.PropTypes.obj,
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
    console.log(this)
    return (
      <Container>
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
          <Card
            dataArray={this.props.results.currentDish.data}
            renderRow={dish =>
              <Card>
                <CardItem>
                  <Text>{dish.dishName}</Text>
                  <Text note>TYPE          {dish.restaurant}</Text>
                </CardItem>
                <ListItem>
                  <Text>Tastes {dish.adjective}</Text>
                  <Button transparent>
                    <Icon name="ios-heart" style={{ color: '#ED4A6A' }} />
                  </Button>
                  <Text>HEARTS</Text>
                  <Button transparent>
                    <Icon name="ios-thumbs-up" />
                  </Button>
                  <Text>{dish.upvotes}</Text>
                  <Button transparent>
                    <Icon name="ios-thumbs-down" />
                  </Button>
                  <Text>{dish.downvotes}</Text>
                  <Button transparent onPress={() => this.pushNewRoute('addReview')}>
                    <Icon name="ios-clipboard" />
                    <Text>Write review</Text>
                  </Button>
                </ListItem>
                <CardItem cardBody>
                  <Image style={{ height: 150 }} source={{ uri: dish.images[0] }} />
                </CardItem>
                <CardItem>
                  <Thumbnail size={80} source={{ uri: dish.images[0] }} />
                </CardItem>
                <ListItem>
                  <Text style={{ width: 280 }} >REVIEWS</Text>
                  <Button transparent>
                    <Icon name="ios-thumbs-up" />
                  </Button>
                  <Button transparent>
                    <Icon name="ios-thumbs-down" />
                  </Button>
                </ListItem>
              </Card>
            }
          />
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
