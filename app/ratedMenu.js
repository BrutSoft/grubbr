import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, CardItem, Title, Header, Icon, Button, Card, Text, Thumbnail } from 'native-base';
import { openDrawer } from './actions/drawer';
import { replaceRoute, popRoute, pushNewRoute } from './actions/route';
import { setCurrentDish, setCurrentRestaurant } from './actions/search';
import { setIndex } from './actions/list';
import styles from './components/login/styles';

class RatedMenu extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    replaceRoute: React.PropTypes.func,
    pushNewRoute: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    setIndex: React.PropTypes.func,
    setCurrentDish: React.PropTypes.func,
    setCurrentRestaurant: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      restaurantData: undefined,
    };
  }

  componentWillMount() {
    this.getDishes();
  }

  setCurrentRestaurant(data) {
    this.props.setCurrentRestaurant(data);
  }

  setCurrentDish(dish) {
    this.props.setCurrentDish(dish);
  }

  getDishes() {
    const that = this;
    // First fetch to get dishes by query
    return fetch(`https://grubbr-api.herokuapp.com/v1/ratedmenu/${this.props.currentRestaurant.id}`)
    .then(response => response.json())
    .then((responseJson) => {
      that.setState({
        restaurantData: responseJson.data[0].menuItems,
      });
    })
    .catch(() => {
      that.setState({
        restaurantData: undefined,
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
          <Button
            bordered
            success
            rounded
            small
            onPress={() => {
              this.pushNewRoute('addDish');
            }}
          >Add dish</Button>
          <Title style={styles.title}>Rated Menu</Title>
          <Card
            dataArray={this.state.restaurantData}
            renderRow={dish => (
              <CardItem
                cardbody
                style={styles.card}
                button
                onPress={() => {
                  this.setCurrentDish(dish);
                  this.pushNewRoute('foodProfile');
                }}
              >
                <Thumbnail size={80} source={{ uri: dish.image }} />
                <CardItem>
                  <Text>{dish.dishName}</Text>
                  <Text style={styles.restaurantTitle} note>{dish.menuType}</Text>
                </CardItem>
                <CardItem>
                  <Thumbnail source={require('./img/grubbr-happy.png')} />
                  <Text>{dish.score}</Text>
                </CardItem>
              </CardItem>
              )}
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
    setCurrentRestaurant: restaurant => dispatch(setCurrentRestaurant(restaurant)),
  };
}

function mapStateToProps(state) {
  return {
    name: state.user.name,
    list: state.list.list,
    currentRestaurant: state.search.currentRestaurant,
  };
}

export default connect(mapStateToProps, bindAction)(RatedMenu);
