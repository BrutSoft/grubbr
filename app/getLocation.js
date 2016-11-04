import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Title, Header, InputGroup, Input, Icon, Button, View, Card, CardItem, Text, Spinner } from 'native-base';
import { openDrawer } from './actions/drawer';
import { replaceRoute, popRoute, pushNewRoute } from './actions/route';
import { setCurrentRestaurant } from './actions/search';
import { setIndex } from './actions/list';
import { setLocation } from './actions/location';
import styles from './components/login/styles';

class GetLocation extends Component {
  static propTypes = {
    openDrawer: React.PropTypes.func,
    replaceRoute: React.PropTypes.func,
    pushNewRoute: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    setIndex: React.PropTypes.func,
    setCurrentRestaurant: React.PropTypes.func,
    setLocation: React.PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      query: null,
      searchedYet: false,
      error: false,
      noResults: false,
    };
  }

  componentWillMount() {
    this.getLocation();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setLocation(position);
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

  setCurrentRestaurant(restaurant) {
    this.props.setCurrentRestaurant(restaurant);
  }

  setLocation(location) {
    this.props.setLocation(location);
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

  search() {
      // Set loading to true when the search starts to display a Spinner
    this.setState({
      loading: true,
      searchedYet: true,
      error: false,
    });
    const that = this;
    const latitude = this.props.location.coords.latitude;
    const longitude = this.props.location.coords.longitude;
    const url = `https://grubbr-api.herokuapp.com/v1/restaurants?latitude=${latitude}&longitude=${longitude}&name=${this.state.query}`;
    return fetch(url)
    .then(response => response.json())
    .then((responseJson) => {
      if (responseJson.data.length === 0) {
        that.setState({
          error: true,
          errorType: 'noResults',
        });
      } else {
        that.setState({
          restaurants: responseJson.data,
          loading: false,
        });
      }
    })
    .catch(() => {
      that.setState({
        loading: false,
        error: true,
        errorType: 'fetch',
      });
    });
  }

  renderResults() {
    if (!this.state.searchedYet) {
      return false;
    }
    return (
      <Card
        style={styles.card}
        dataArray={this.state.restaurants}
        renderRow={restaurant => (
          <CardItem
            button
            onPress={() => {
              this.setCurrentRestaurant(restaurant);
              this.pushNewRoute('ratedMenu');
            }}
          >
            <Text>{restaurant.name}</Text>
            <Text>{restaurant.address}</Text>
          </CardItem>
        )}
      />
    );
  }

  renderError() {
    let errorMessage;
    if (this.state.errorType === 'fetch') {
      errorMessage = 'There was a problem connecting to our delicious servers! Please try again in a short while';
    } else if (this.state.errorType === 'noResults') {
      errorMessage = 'No results found :(';
    } else if (this.state.errorType === 'geo') {
      errorMessage = 'Uh oh! There was a problem sending your location to the server!';
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

        <Content style={styles.padding}>
          <Title style={styles.title}>Search Restaurants</Title>
          <InputGroup
            style={styles.search}
          >
            <Icon name="ios-search" />
            <Input
              placeholder="Search"
              value={this.state.query}
              onChangeText={text => this.setState({ query: text })}
              onSubmitEditing={() => this.search()}
            />
          </InputGroup>
          <View style={styles.padding}>
            <View>
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>
          </View>
        </Content>
      </Container>
    );
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

        <Content style={styles.padding}>
          <Title style={styles.title}>Search Restaurants</Title>
          <InputGroup
            style={styles.search}
          >
            <Icon name="ios-search" />
            <Input
              placeholder="Search"
              value={this.state.query}
              onChangeText={text => this.setState({ query: text })}
              onSubmitEditing={() => this.search()}
            />
          </InputGroup>
          <View style={styles.padding}>
            {this.state.loading ?
              <View>
                <Spinner color="green" />
              </View> :
                this.renderResults()
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
    setCurrentRestaurant: restaurant => dispatch(setCurrentRestaurant(restaurant)),
    setLocation: location => dispatch(setLocation(location)),
  };
}
function mapStateToProps(state) {
  return {
    name: state.user.name,
    list: state.list.list,
    results: state.search,
    location: state.location.location,
  };
}
export default connect(mapStateToProps, bindAction)(GetLocation);
