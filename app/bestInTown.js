import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Title, Header, InputGroup, Input, Icon, Button, View, Card, CardItem, Thumbnail, Text, Spinner } from 'native-base';
import { openDrawer } from './actions/drawer';
import { replaceRoute, popRoute, pushNewRoute } from './actions/route';
import { setCurrentDish } from './actions/search';
import { setIndex } from './actions/list';
import { setLocation } from './actions/location';
import styles from './components/login/styles';

class BestInTown extends Component {
  static propTypes = {
    openDrawer: React.PropTypes.func,
    replaceRoute: React.PropTypes.func,
    pushNewRoute: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    setIndex: React.PropTypes.func,
    setCurrentDish: React.PropTypes.func,
    setLocation: React.PropTypes.func,
    location: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      query: null,
      error: false,
      noResults: false,
      searchedYet: false,
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
        if (this.state.loading) {
          this.setState({
            error: true,
            errorType: 'geo',
          });
        }
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  setLocation(location) {
    this.props.setLocation(location);
  }

  setCurrentDish(dish) {
    this.props.setCurrentDish(dish);
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
      error: false,
      searchedYet: true,
    });
    const that = this;
    const latitude = this.props.location.coords.latitude || null;
    const longitude = this.props.location.coords.longitude || null;
    const url = `https://grubbr-api.herokuapp.com/v1/search?latitude=${latitude}&longitude=${longitude}&dish__name__icontains=${this.state.query}`;
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
          dishes: responseJson.data,
          loading: false,
        });
      }
    })
    .catch(() => {
      that.setState({
        loading: false,
        error: true,
        errorType: 'fetch'
      });
    });
  }

  renderError() {
    let errorMessage;
    if (this.state.errorType === 'geo') {
      errorMessage = 'Uh oh! There was a problem sending your location to the server!';
    } else if (this.state.errorType === 'fetch') {
      errorMessage = 'There was a problem connecting to our delicious servers! Please try again in a short while';
    } else if (this.state.errorType === 'noResults') {
      errorMessage = 'No results Found! :('
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
          <Title style={styles.title}>Search Grub</Title>
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

  renderResults() {
    if (!this.state.searchedYet) {
      return false;
    }
    return (
      <Card
        style={styles.card}
        dataArray={this.state.dishes}
        renderRow={dish => (
          <CardItem
            button
            onPress={() => {
              this.setCurrentDish(dish);
              this.pushNewRoute('foodProfile');
            }}
          >
            <Thumbnail size={80} source={{ uri: dish.images[0] }} />
            <Text>{dish.dishName}</Text>
            <Icon name="ios-thumbs-up" />
            <Text>{dish.upvotes}</Text>
            <Icon name="ios-thumbs-down" />
            <Text>{dish.downvotes}</Text>
          </CardItem>
        )}
      />
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
          <Title style={styles.title}>Find Grub</Title>
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
    setCurrentDish: dish => dispatch(setCurrentDish(dish)),
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
export default connect(mapStateToProps, bindAction)(BestInTown);
