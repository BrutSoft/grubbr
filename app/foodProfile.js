import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Container, Content, DeckSwiper, List, ListItem, Title, Header, InputGroup, Input, Icon, Button, View, Card, CardItem, Thumbnail, Text } from 'native-base';

import { openDrawer, closeDrawer } from './actions/drawer';
import { replaceRoute, popRoute , pushNewRoute } from './actions/route';
import { setIndex } from './actions/list';

const dishes = [
  {
    name: 'Dish One fuckin adorbz dish yeah',
    restaurant: "Antoine's",
    menu_type: 'Appetizers',
    image: require('./img/food_one.png'),
    hearts: '12',
    upvotes: '43',
    downvotes: '9',
    adjective: 'spicy',
    dish_type: 'Thai',
    reviews: [
      'Awesome taste, I will absolutely come back to grab them once again'
    ],
  }
];

class FoodProfile extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    replaceRoute: React.PropTypes.func,
    replaceOrPushRoute: React.PropTypes.func,
    pushNewRoute: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    setIndex: React.PropTypes.func,
    name: React.PropTypes.string,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
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
            dataArray={dishes}
            renderRow={(dish) =>
              <Card>
                <CardItem>
                  <Text>{dish.name}</Text>
                  <Text note>{dish.dish_type}          {dish.restaurant}</Text>
                </CardItem>
                <ListItem>
                  <Text>Tastes {dish.adjective}  </Text>
                  <Button transparent>
                    <Icon name="ios-heart" style={{ color: '#ED4A6A' }} />
                  </Button>
                  <Text>{dish.hearts}</Text>
                  <Button transparent>
                    <Icon name="ios-thumbs-up" />
                  </Button>
                  <Text>{dish.upvotes}</Text>
                  <Button transparent>
                    <Icon name="ios-thumbs-down" />
                  </Button>
                  <Text>{dish.downvotes}</Text>
                  <Button transparent>
                    <Icon name="ios-clipboard" />
                    <Text>Write review</Text>
                  </Button>
                </ListItem>
                <CardItem cardBody>
                  <Image style={{height: 150}} source={dish.image} />
                </CardItem>
                <CardItem>
                  <Thumbnail size={80} source={dish.image} />
                </CardItem>
                <ListItem>
                  <Text style={{width: 280}} >{dish.reviews}</Text>
                  <Button transparent>
                    <Icon name="ios-thumbs-up" />
                  </Button>
                  <Button transparent>
                    <Icon name="ios-thumbs-down" />
                  </Button>
                </ListItem>
              </Card>
            }>
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
    popRoute: () => dispatch(popRoute())
  };
}

function mapStateToProps(state) {
  return {
    name: state.user.name,
    list: state.list.list,
  };
}

export default connect(null, bindAction)(FoodProfile);
