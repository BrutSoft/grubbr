import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, Grid, Row, View } from 'native-base';

import { openDrawer } from './actions/drawer';
import { replaceRoute, popRoute, pushNewRoute } from './actions/route';
import { setIndex } from './actions/list';
import styles from './components/login/styles';


class Choices extends Component {

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

export default connect(mapStateToProps, bindAction)(Choices);
