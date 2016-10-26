import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Title, Header, InputGroup, Input, Icon, Button, View, Card, CardItem, Thumbnail, Text, Spinner } from 'native-base';
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
    // sorry, mom
    const that = this;
    // First fetch to get dishes by query
    return fetch(`https://grubbr-api.herokuapp.com/v1/dishes?name__icontains=${this.state.search}`)
    .then(response => response.json())
    .then((responseJson) => {
      // Second promisified fetch for scores of all queried dishes
      Promise.all(responseJson.data.map(dish => fetch(`https://grubbr-api.herokuapp.com/v1/score/${dish.id}`)))
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then((response) => {
        const sortedScores = _.orderBy(response, e => e.data[0].score, ['desc']);
        that.setState({
          scores: sortedScores,
          loading: false,
        });
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
    console.log(this)
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
            <Input
              placeholder="Search"
              value={this.state.search}
              onChangeText={text => this.setState({ search: text })}
              onSubmitEditing={() => this.search()}
            />
          </InputGroup>
          <View>
            {this.state.loading ?
              <View>
                <Spinner color="blue" />
              </View> :
                <Card
                  dataArray={this.state.scores}
                  renderRow={(elem) => {
                    const item = elem.data[0];
                    return (
                      <CardItem button onPress={() => this.pushNewRoute('foodProfile')}>
                        <Thumbnail size={80} source={{ uri: item.images[0] }} />
                        <Text>{item.dishName}</Text>
                        <Icon name="ios-thumbs-up" />
                        <Text>{item.upvotes}</Text>
                        <Icon name="ios-thumbs-down" />
                        <Text>{item.downvotes}</Text>
                      </CardItem>
                    );
                  }
                }
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
  };
}
function mapStateToProps(state) {
  return {
    name: state.user.name,
    list: state.list.list,
    results: state.search,
  };
}
export default connect(mapStateToProps, bindAction)(BestInTown);
