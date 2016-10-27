import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';
import { Container, Content, Title, Header, InputGroup, Input, Icon, Button, Text, List, ListItem, Picker } from 'native-base';

import { openDrawer } from './actions/drawer';
import { replaceRoute, popRoute, pushNewRoute } from './actions/route';
import { setIndex } from './actions/list';
import styles from './components/login/styles';


const deviceWidth = Dimensions.get('window').width;
const Item = Picker.Item;
class AddReview extends Component {

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
      selectedItem: undefined,
      selected: '3',
      user_id: '1',
      review: undefined,
      dish_id: 1,
      rating: 0,
    };
  }

  onValueChange(value: string) {
    this.setState({
      selected: value,
    });
  }

  pushNewRoute(route, index) {
    this.props.setIndex(index);
    this.props.pushNewRoute(route);
  }

  popRoute() {
    this.props.popRoute();
  }

  replaceRoute(route) {
    this.props.replaceRoute(route);
  }

  submitReview() {
    return fetch('https://grubbr-api.herokuapp.com/v1/ratings', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dish_id: this.props.results.currentDish.dishID,
        user_id: this.state.user_id,
        rating: Number(this.state.rating),
        review: this.state.review,
        adjective_id: this.state.selectedItem,
      }),
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

        <Content style={styles.padding}>
          <Title>
            <Text>Add Review</Text>
          </Title>
          <List style={styles.box}>
            <ListItem>
              <InputGroup borderType="regular" >
                <Input style={{ height: 200 }} multiline placeholder="Type your text" value={this.state.review} onChangeText={text => this.setState({ review: text })} />
              </InputGroup>
            </ListItem>
            <ListItem>
              <Button transparent value={this.state.rating} onPress={() => this.setState({ rating: this.state.rating + 1 })}>
                <Icon name="ios-thumbs-up" />
              </Button>
              <Button transparent value={this.state.rating} onPress={() => this.setState({ rating: this.state.rating - 1 })}>
                <Icon name="ios-thumbs-down" />
              </Button>
              <Picker
                style={styles.center}
                iosHeader="Select one"
                mode="dropdown"
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Item label="Spicy" value="1" />
                <Item label="Sweet" value="2" />
                <Item label="Savory" value="3" />
                <Item label="Earthy" value="4" />
                <Item label="Fruity" value="5" />
                <Item label="Full Bodied" value="6" />
              </Picker>
            </ListItem>
            <Button
              block rounded
              onPress={() => {
                this.submitReview();
                this.popRoute();
              }}
            >
              Submit
            </Button>
          </List>
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

export default connect(mapStateToProps, bindAction)(AddReview);
