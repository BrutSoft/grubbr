import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Container, Content, DeckSwiper, List, ListItem, Title, Header, InputGroup, Input, Icon, Button, View, Card, CardItem, Thumbnail, Text } from 'native-base';
import { openDrawer, closeDrawer } from './actions/drawer';
import { replaceRoute, popRoute , pushNewRoute } from './actions/route';
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
  },
  {
    name: 'Dish Two',
    restaurant: 'Lelio',
    menu_type: 'Soups & Salads',
    image: require('./img/food_two.png'),
    hearts: '45',
    upvotes: '23',
    downvotes: '8',
  },
  {
    name: 'Dish Three',
    restaurant: 'Bistro',
    menu_type: 'Entrees',
    image: require('./img/food_three.png'),
    hearts: '32',
    upvotes: '100',
    downvotes: '67',
  },
  {
    name: 'Dish Four',
    restaurant: 'Bistro',
    menu_type: 'Entrees',
    image: require('./img/food_three.png'),
    hearts: '32',
    upvotes: '104',
    downvotes: '67',
  }
];

class RatedMenu extends Component {

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
          <Title>Rated Menu</Title>
            <InputGroup borderType='rounded' >
              <Icon name="ios-search" />
              <Input placeholder="Search" />
            </InputGroup>
            <List
              dataArray={dishes}
              renderRow={(dish) =>
                <Card>
                <ListItem itemDivider rounded>
                  <Text>{dish.menu_type}</Text>
                </ListItem>
                <ListItem>
                  <Text>{dish.name}</Text>
                  <Icon name="ios-thumbs-up" />
                  <Text>{dish.upvotes - dish.downvotes}</Text>
                </ListItem>
                </Card>
              }>
            </List>
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

export default connect(null, bindAction)(RatedMenu);
