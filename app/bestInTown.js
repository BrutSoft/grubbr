import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Title, Header, InputGroup, Input, Icon, Button, View, Card, CardItem, Thumbnail, Text } from 'native-base';
import { openDrawer } from './actions/drawer';
import { replaceRoute, popRoute, pushNewRoute } from './actions/route';
import { setIndex } from './actions/list';

class BestInTown extends Component {

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
      search: null,
      results: {
        items: [],
      },
    };
  }

  componentDidMount() {
    const that = this;
    that.search();
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

    const that = this;
    return fetch(`https://grubbr-api.herokuapp.com/v1/dishes?name__icontains=${this.state.search}`)
      .then(response => response.json())
      .then((responseJson) => {
        that.setState({
          results: responseJson,
          loading: false,
        });
        return responseJson.Search;
      })
      .catch((error) => {
        that.setState({
          loading: false,
        });
        console.error(error);
      });
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
          <Title>Best In Town</Title>
          <InputGroup borderType="rounded">
            <Icon name="ios-search" />
            <Input placeholder="Search" value={this.state.search} onChangeText={text => this.setState({ search: text })} onSubmitEditing={() => this.search()} />
          </InputGroup>
          <View>
            <Card
              dataArray={this.state.results.data}
              renderRow={item =>
                <CardItem button onPress={() => this.pushNewRoute('foodProfile')}>
                  <Thumbnail size={80} source={item.image} />
                  <Text>{item.name}</Text>
                  <Icon name="ios-thumbs-up" />
                  <Text>11</Text>
                  <Icon name="ios-thumbs-down" />
                  <Text>11</Text>
                </CardItem>
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

export default connect(mapStateToProps, bindAction)(BestInTown);
