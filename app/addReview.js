import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Dimensions } from 'react-native';
import { Container, Content, DeckSwiper, Title, Header, InputGroup, Input, Icon, Button, View, Card, CardItem, Thumbnail, Text, List, ListItem, Picker } from 'native-base';

import { openDrawer, closeDrawer } from './actions/drawer';
import { replaceRoute, popRoute , pushNewRoute } from './actions/route';
import { setIndex } from './actions/list';

const deviceWidth = Dimensions.get('window').width;
const Item = Picker.Item;
class AddReview extends Component {

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

  constructor(props) {
    super(props);
      this.state = {
        selectedItem: undefined,
        selected1: 'key1',
          results: {
            items: []
          }
      }
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

  onValueChange (value: string) {
    this.setState({
      selected1 : value
    });
  }

  render () {
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
          <Title>
            <Text>Add Review</Text>
          </Title>
          <List>
            <ListItem>
              <Button transparent>
                <Icon name="ios-heart" style={{ color: '#ED4A6A' }} />
              </Button>
              <Button transparent>
                <Icon name="ios-thumbs-up" />
              </Button>
              <Button transparent>
                <Icon name="ios-thumbs-down" />
              </Button>
          </ListItem>
            <ListItem>
              <InputGroup borderType='regular' style={{width: deviceWidth - 33}} >
                <Input style={{height: 200}} multiline={true} placeholder='Type your text'/>
              <InputGroup borderType='regular' >
                <Input multiline={true} placeholder='Type your text'/>
              </InputGroup>
            </ListItem>
              <Picker
                iosHeader="Select one"
                mode="dropdown"
                selectedValue={this.state.selected1}
                onValueChange={this.onValueChange.bind(this)}>
                <Item label="Spicy" value="key0" />
                <Item label="Sweet" value="key1" />
                <Item label="Savory" value="key2" />
                <Item label="Earthy" value="key3" />
                <Item label="Fruity" value="key4" />
                <Item label="Full Bodied" value="key5" />
              </Picker>
          <ListItem>
            <Button block rounded>
              Add image
            </Button>
          </ListItem>
          <ListItem>
            <Button block rounded>
              Submit
            </Button>
          </ListItem>
          </List>
        </Content>
      </Container>
    )
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

export default connect(mapStateToProps, bindAction)(AddReview);
