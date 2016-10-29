import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Title, Header, InputGroup, Input, Icon, Button, View, Card, CardItem, Text, Spinner } from 'native-base';
import { openDrawer } from './actions/drawer';
import { replaceRoute, popRoute, pushNewRoute } from './actions/route';
import { setCurrentRestaurant } from './actions/search';
import { setIndex } from './actions/list';
import styles from './components/login/styles';

class GetLocation extends Component {
  static propTypes = {
    openDrawer: React.PropTypes.func,
    replaceRoute: React.PropTypes.func,
    pushNewRoute: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    setIndex: React.PropTypes.func,
    setCurrentRestaurant: React.PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      search: null,
    };
  }
  componentDidMount() {
    this.search().done();
  }
  setCurrentRestaurant(restaurant) {
    this.props.setCurrentRestaurant(restaurant);
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
    });
    // sorry, mom
    const that = this;
    // First fetch to get dishes by query
    return fetch(`https://grubbr-api.herokuapp.com/v1/restaurants?name__icontains=${this.state.search}`)
    .then(response => response.json())
    .then((responseJson) => {
      that.setState({
        restaurants: responseJson.data,
        loading: false,
      });
    })
    .catch(() => {
      that.setState({
        loading: false,
        noResults: true,
      });
    });
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
          <Title style={styles.title}>Find the Restaurant</Title>
          <InputGroup
            style={styles.search}
          >
            <Icon name="ios-search" />
            <Input
              placeholder="Search"
              value={this.state.search}
              onChangeText={text => this.setState({ search: text })}
              onSubmitEditing={() => this.search()}
            />
          </InputGroup>
          <View style={styles.padding}>
            {this.state.loading ?
              <View>
                <Spinner color="green" />
              </View> :
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
                      <Text>ADDRESS</Text>
                    </CardItem>
                    )}
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
    setCurrentRestaurant: restaurant => dispatch(setCurrentRestaurant(restaurant)),
  };
}
function mapStateToProps(state) {
  return {
    name: state.user.name,
    list: state.list.list,
    results: state.search,
  };
}
export default connect(mapStateToProps, bindAction)(GetLocation);
