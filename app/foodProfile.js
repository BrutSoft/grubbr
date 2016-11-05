import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Image, Linking, Alert } from 'react-native';
import { Container, Content, ListItem, Title, Header, Icon, Button, Card, CardItem, Thumbnail, Text, List, View, Spinner, Grid, Col } from 'native-base';

import { openDrawer } from './actions/drawer';
import { replaceRoute, popRoute, pushNewRoute } from './actions/route';
import { setIndex } from './actions/list';
import { setCurrentDish } from './actions/search'
import { setLocation } from './actions/location'
import styles from './components/login/styles';

const defaultImg = 'https://s-media-cache-ak0.pinimg.com/236x/33/04/e3/3304e35f47f81180e8c8b896b5d57332.jpg';

class FoodProfile extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    replaceRoute: React.PropTypes.func,
    pushNewRoute: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    setIndex: React.PropTypes.func,
    setCurrentDish: React.PropTypes.func,
    currentDish: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
    };
  }

  componentWillMount() {
    this.getFoodProfile();
  }

  setLocation(location) {
    this.props.setLocation(location);
  }

  setCurrentDish(dish) {
    this.props.setCurrentDish(dish)
  }

  getFoodProfile() {
    const dishID = this.props.currentDish.dishID;
    const that = this;
    fetch(`https://grubbr-api.herokuapp.com/v1/score/${dishID}`)
    .then(response => response.json()
    )
    .then((responseJson) => {
      that.setCurrentDish(responseJson.data[0]);
      that.setState({
        loading: false,
      })
    })
    .catch(() => {
      that.setState({
        loading: false,
        error: true,
      })
    });
  }

  getDirections() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setLocation(position);
        const latitude = this.props.location.coords.latitude || null;
        const longitude = this.props.location.coords.longitude || null;
        Linking.openURL(`https://www.google.com/maps/dir/${latitude},${longitude}/${this.props.currentDish.restaurant}`);
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
        { this.state.loading ?
          <View>
            <Spinner color="green" />
          </View> :
          <Content style={styles.padding}>
            <Title style={styles.title}>{this.props.currentDish.dishName}</Title>
            <Card style={styles.card}>
              <CardItem onPress={() => Alert.alert(
                  'Hey! Listen!',
                  'Grubbr needs to leave this app to give you directions. You cool with that?',
                  [
                    { text: 'No way!', onPress: () => false },
                    { text: 'Eh, sure', onPress: () => this.getDirections() }
                  ]
                )}
              >
                <Text note style={styles.restaurantTitle}>{this.props.currentDish.restaurant}</Text>
              </CardItem>
              <CardItem cardBody>
                <Image
                  source={{ uri: this.props.currentDish.images[0] || defaultImg }}
                />
              </CardItem>
              <ListItem>
                <Grid>
                  <Col>
                    <Text>Tastes {this.props.currentDish.adjective}</Text>
                  </Col>
                  <Col>
                    <Text>{this.props.currentDish.upvotes} Grubs</Text>
                  </Col>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  style={styles.border}
                  block
                  large
                  onPress={() => this.pushNewRoute('addReview')}
                >
                  Grub It!
                  </Button>
                </ListItem>
                <List
                  dataArray={this.props.currentDish.reviews.slice().reverse()}
                  renderRow={review =>
                    <ListItem>
                      <Text style={{ width: 280 }} >{review.review}</Text>
                      <Thumbnail size={80} source={{ uri: review.image || defaultImg }} />
                    </ListItem>
                }
                />
              </Card>
            </Content>
        }
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
    currentDish: state.search.currentDish,
    location: state.location.location,
  };
}

export default connect(mapStateToProps, bindAction)(FoodProfile);
