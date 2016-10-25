import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Container, Content, DeckSwiper, Title, Header, Icon, Button, View, Card, CardItem, Thumbnail, Text } from 'native-base';

import { openDrawer } from './actions/drawer';
import { replaceRoute, popRoute, pushNewRoute } from './actions/route';
import { setIndex } from './actions/list';

class Tender extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    replaceRoute: React.PropTypes.func,
    pushNewRoute: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    setIndex: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      fetch: null,
      results: {
        items: [],
      },
    };
  }
  componentWillMount() {
    this.fetch().done();
  }

  componentDidMount() {
    this.fetch().done();
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

  fetch() {
      // Set loading to true when the search starts to display a Spinner
    this.setState({
      loading: true,
    });
    const that = this;
    return fetch('https://grubbr-api.herokuapp.com/v1/dishes')
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson.data[0].id);
        Promise.all(responseJson.data.map(dish => fetch(`https://grubbr-api.herokuapp.com/v1/score/${dish.id}`)))
          .then((responses) => {
            return Promise.all(responses.map(response => response.json()));
          })
        .then((response) => {
          that.setState({
            scores: response,
            loading: false,
          });
        });
      })
      .catch((error) => {
        that.setState({
          loading: false,
        });
        console.error(error);
      });
  }

  render() {
    console.log('DATA', this.state.scores);
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
          <View>
            <Title>Tender</Title>
            <DeckSwiper
              dataSource={this.state.scores}
              renderItem={(elem) => {
                const item = elem.data[0];
                return (
                  <Card style={{ elevation: 3 }}>
                    <CardItem>
                      <Thumbnail source={item.images[0]} />
                      <Text>{item.dishName}</Text>
                      <Text note>{item.restaurant}</Text>
                    </CardItem>
                    <CardItem>
                      <Image size={80} source={item.images[0]} />
                    </CardItem>
                    <CardItem>
                      <Icon name="ios-thumbs-up" />
                      <Text>{item.upvotes}</Text>
                      <Icon name="ios-thumbs-down" />
                      <Text>{item.downvotes}</Text>
                    </CardItem>
                  </Card>
              ); }
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

export default connect(mapStateToProps, bindAction)(Tender);
