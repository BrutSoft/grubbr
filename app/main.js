import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon } from 'native-base';
import { openDrawer } from './actions/drawer';
import { replaceRoute, popRoute, pushNewRoute } from './actions/route';
import { setIndex } from './actions/list';
import { setTenderData } from './actions/search';


class Main extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    replaceRoute: React.PropTypes.func,
    pushNewRoute: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    setIndex: React.PropTypes.func,
    setTenderData: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      tenderData: [],
    };
  }

  componentWillMount() {
    this.getTenderData();
  }

  setTenderData(data) {
    this.props.setTenderData(data)
  }

  getTenderData() {
    const that = this;
    // First fetch to get dishes by query
    return fetch('https://grubbr-api.herokuapp.com/v1/tender')
    .then(response => response.json())
    .then((responseJson) => {
      console.log('got this far')
      that.setState({
        tenderData: responseJson.data,
      });
    })
    .catch(() => {
      that.setState({
        tenderData: [],
      });
    });
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
          <View>
            <Button
              block
              rounded
              onPress={() => {
                this.setTenderData(this.state.tenderData);
                this.pushNewRoute('choices');
              }}
            >
            Find grub
            </Button>
            <Button
              block
              rounded
              onPress={() => {
                this.pushNewRoute('addReview');
              }}
            >
            Write grub
            </Button>
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
    setTenderData: data => dispatch(setTenderData(data))
  };
}

function mapStateToProps(state) {
  return {
    name: state.user.name,
    list: state.list.list,
    tenderData: state.search.tenderData,
  };
}

export default connect(mapStateToProps, bindAction)(Main);
