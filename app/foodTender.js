import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Container, Content, DeckSwiper, Title, Header, Icon, Button, View, Card, CardItem, Text, ListItem, Spinner } from 'native-base';

import { openDrawer } from './actions/drawer';
import { replaceRoute, popRoute, pushNewRoute } from './actions/route';
import { setIndex } from './actions/list';
import { setCurrentDish, setTenderIndex, setTenderData } from './actions/search';
import { setLocation } from './actions/location';
import styles from './components/login/styles';

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
    setLocation: React.PropTypes.func,
    tenderData: React.PropTypes.array,
    tenderIndex: React.PropTypes.number,
    location: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      errorType: null,
    };
  }

  componentWillMount() {
    if (this.props.tenderData.length === 0) {
      this.getLocation();
    } else {
      this.setTenderIndex(0);
      this.setState({
        loading: false,
      });
    }
  }

  setTenderData(data) {
    this.props.setTenderData(data);
  }

  setLocation(location) {
    this.props.setLocation(location);
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setLocation(position);
        this.getTenderData();
      },
      () => {
        this.setState({
          error: true,
          errorType: 'geo',
        });
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  getTenderData() {
    const latitude = this.props.location.coords.latitude;
    const longitude = this.props.location.coords.longitude;
    const that = this;

    fetch(`https://grubbr-api.herokuapp.com/v1/tender?latitude=${latitude}&longitude=${longitude}`)
    .then(response => response.json()
    )
    .then((responseJson) => {
      that.setTenderData(responseJson.data);
      that.setTenderIndex(0);
      that.setState({
        loading: false,
      });
    })
    .catch(() => {
      that.setState({
        error: true,
        errorType: 'fetch',
      });
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

  renderError() {
    let errorMessage;
    if (this.state.errorType === 'geo') {
      errorMessage = 'Uh oh! There was a problem sending your location to the server!';
    } else if (this.state.errorType === 'fetch') {
      errorMessage = 'There was a problem connecting to our delicious servers! Please try again in a short while';
    }
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
            <View>
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>
          </View>
        </Content>
      </Container>
    )
  }

  render() {
    if (this.state.error) {
      return this.renderError();
    }
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
                  onSwipeLeft={() => {
                    let nextIndex = this.props.tenderIndex + 1;
                    if (nextIndex >= this.props.tenderData.length) {
                      nextIndex = 0;
                    }
                    this.setTenderIndex(nextIndex);
                  }}
                  onSwipeRight={() => {
                    this.setCurrentDish(this.props.tenderData[this.props.tenderIndex]);
                    this.setTenderIndex(this.props.tenderIndex + 1);
                    this.pushNewRoute('foodProfile');
                  }}
                  renderItem={dish =>
                    <Card style={styles.tenderCard}>
                      <ListItem>
                        <Text>{dish.dishName}</Text>
                        <Text note style={styles.restaurantTitle}>{dish.restaurantName}</Text>
                      </ListItem>
                      <CardItem>
                        <Image size={80} source={{ uri: dish.images[0] }} />
                      </CardItem>
                      <CardItem>
                        <CardItem>
                          <Icon name="ios-arrow-dropleft-circle" />
                          <Text>Ew!</Text>
                        </CardItem>
                        <CardItem>
                          <Icon name="ios-thumbs-up" />
                          <Text>{dish.upvotes}</Text>
                        </CardItem>
                        <Text>adjective{dish.adjective}</Text>
                        <Text>Yummy!</Text>
                        <Icon name="ios-arrow-dropright-circle" />
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
    setLocation: location => dispatch(setLocation(location)),
  };
}

function mapStateToProps(state) {
  return {
    name: state.user.name,
    list: state.list.list,
    tenderData: state.search.tenderData,
    tenderIndex: state.search.tenderIndex,
    location: state.location.location,
  };
}

export default connect(mapStateToProps, bindAction)(Tender);
