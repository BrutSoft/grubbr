import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, Grid, Row, View } from 'native-base';

import { replaceRoute, popRoute, pushNewRoute } from './actions/route';
import { setIndex } from './actions/list';
import { setLocation } from './actions/location';
import styles from './components/login/styles';


class Choices extends Component {

  static propTypes = {
    replaceRoute: React.PropTypes.func,
    pushNewRoute: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    setIndex: React.PropTypes.func,
  }

  componentWillMount() {
    this.getLocation();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setLocation(position);
      },
      error => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
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

  render() {
    return (
      <Container style={styles.bgColor}>
        <Content style={styles.main}>
          <Grid>
            <Row style={{ height: 100 }}>
              <View>
                <Button
                  style={styles.border}
                  large
                  block
                  onPress={() => {
                    this.pushNewRoute('bestInTown');
                  }}
                >
                  I know WHAT I want
                </Button>
              </View>
            </Row>
            <Row style={{ height: 100 }}>
              <View>
                <Button
                  style={styles.border}
                  large
                  block
                  onPress={() => {
                    this.pushNewRoute('getLocation');
                  }}
                >
                   I know WHERE I go
                </Button>
              </View>
            </Row>
            <Row style={{ height: 100 }}>
              <View>
                <Button
                  style={styles.border}
                  large
                  block
                  onPress={() => {
                    this.pushNewRoute('tender');
                  }}
                >
                    I ain't got a clue
                </Button>
              </View>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    replaceRoute: route => dispatch(replaceRoute(route)),
    pushNewRoute: route => dispatch(pushNewRoute(route)),
    setIndex: index => dispatch(setIndex(index)),
    popRoute: () => dispatch(popRoute()),
    setLocation: location => dispatch(setLocation(location)),
  };
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    location: state.location.location,
  };
}

export default connect(mapStateToProps, bindAction)(Choices);
