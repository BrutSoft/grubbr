import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Title, Header, InputGroup, Input, Icon, Button, View, Card, CardItem, Thumbnail, Text } from 'native-base';
import { openDrawer } from './actions/drawer';
import { replaceRoute, popRoute, pushNewRoute } from './actions/route';
import { setIndex } from './actions/list';

const cards = [
  {
    name: 'Dish One',
    restaurant: "Antoine's",
    image: require('./img/food_one.png'),
    hearts: '12',
    upvotes: '43',
    downvotes: '9',
  },
  {
    name: 'Dish Two',
    restaurant: 'Lelio',
    image: require('./img/food_two.png'),
    hearts: '45',
    upvotes: '23',
    downvotes: '8',
  },
  {
    name: 'Dish Three',
    restaurant: 'Bistro',
    image: require('./img/food_three.png'),
    hearts: '32',
    upvotes: '100',
    downvotes: '67',
  },

];

class BestInTown extends Component {

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
          <Title>Best In Town</Title>
          <InputGroup borderType="rounded" >
            <Icon name="ios-search" />
            <Input placeholder="Search" />
          </InputGroup>
          <View>
            <Card
              dataArray={cards}
              renderRow={item =>
                <CardItem button onPress={() => this.pushNewRoute('foodProfile')}>
                  <Thumbnail size={80} source={item.image} />
                  <Text>{item.name}</Text>
                  <Icon name="ios-heart" style={{ color: '#ED4A6A' }} />
                  <Text>{item.hearts}</Text>
                  <Icon name="ios-thumbs-up" />
                  <Text>{item.upvotes}</Text>
                  <Icon name="ios-thumbs-down" />
                  <Text>{item.downvotes}</Text>
                </CardItem>
                }
            />
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
  };
}

function mapStateToProps(state) {
  return {
    name: state.user.name,
    list: state.list.list,
  };
}

export default connect(mapStateToProps, bindAction)(BestInTown);
