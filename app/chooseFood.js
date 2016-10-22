import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Text, Button, Icon } from 'native-base';
import { openDrawer, closeDrawer } from './actions/drawer';
import { replaceRoute, popRoute , pushNewRoute } from './actions/route';
import { setIndex } from './actions/list';

class Choices extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    replaceRoute: React.PropTypes.func,
    replaceOrPushRoute: React.PropTypes.func,
    pushNewRoute: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    setIndex: React.PropTypes.func,
    name: React.PropTypes.string,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
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
          <Button transparent onPress={() => this.replaceRoute('login')}>
            <Icon name="ios-arrow-back" />
          </Button>

          <Title>Grubbr</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content>
          <Button block rounded
            onPress={() => {
              this.pushNewRoute('bestInTown');
            }}>
            I know WHAT I want
          </Button>
          <Button block rounded
            onPress={() => {
              this.pushNewRoute('ratedMenu');
            }}>
            I know WHERE I wanna go
          </Button>
          <Button block rounded
            onPress={() => {
              this.pushNewRoute('tender');
            }}>
            I ain't got a clue
          </Button>
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
    popRoute: () => dispatch(popRoute())
  };
}

function mapStateToProps(state) {
  return {
    name: state.user.name,
    list: state.list.list,
  };
}

export default connect(mapStateToProps, bindAction)(Choices);
