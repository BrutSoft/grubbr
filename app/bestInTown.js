import React, { Component, Image } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Title, Header, InputGroup, Input, Icon, Button, View, Card, CardItem, Thumbnail, Text } from 'native-base';
import _ from 'lodash';
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
    this.search().done();
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
          loading: true,
        });
        return responseJson;
      })
      .then((responseJson) => {
        Promise.all(responseJson.data.map(dish => fetch(`https://grubbr-api.herokuapp.com/v1/score/${dish.id}`)))
          .then((responses) => {
            return Promise.all(responses.map(response => response.json()));
          })
        .then((response) => {
          const sortedScores = _.orderBy(response, (e) => e.data[0].score, ['desc']);
          that.setState({
            scores: sortedScores,
            loading: false,
          });
        });
      })
      .catch((error) => {
        that.setState({
          loading: false,
        });
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
              dataArray={this.state.scores}
              renderRow={(elem) => {
                const item = elem.data[0];
                return (
                  <CardItem button onPress={() => this.pushNewRoute('foodProfile')}>
                    <Text>{item.dishName}</Text>
                    <Icon name="ios-thumbs-up" />
                    <Text>{item.upvotes}</Text>
                    <Icon name="ios-thumbs-down" />
                    <Text>{item.downvotes}</Text>
                  </CardItem>
              ); }
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
