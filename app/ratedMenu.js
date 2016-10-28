import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, List, ListItem, Title, Header, InputGroup, Input, Icon, Button, Card, Text } from 'native-base';
import { openDrawer } from './actions/drawer';
import { replaceRoute, popRoute, pushNewRoute } from './actions/route';
import { setCurrentDish } from './actions/search';
import { setIndex } from './actions/list';
import styles from './components/login/styles';

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
  },
];

class RatedMenu extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    replaceRoute: React.PropTypes.func,
    pushNewRoute: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    setIndex: React.PropTypes.func,
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
          <Title style={styles.title}>Rated Menu</Title>
          <InputGroup style={styles.search}>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
          </InputGroup>
          <List
            style={styles.padding}
            dataArray={dishes}
            renderRow={dish =>
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
    setCurrentDish: dish => dispatch(setCurrentDish(dish)),
  };
}

function mapStateToProps(state) {
  return {
    name: state.user.name,
    list: state.list.list,
    results: state.search,
  };
}

export default connect(mapStateToProps, bindAction)(RatedMenu);
