import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Content, DeckSwiper, Title, Header, InputGroup, Input, Icon, Button, View, Card, CardItem, Thumbnail, Text, List, ListItem, Picker } from 'native-base';

const Item = Picker.Item;
class AddReview extends Component {
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
  onValueChange (value: string) {
    this.setState({
      selected1 : value
    });
  }

  render () {
    return (
      <Container>
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
              <InputGroup borderType='regular' >
                <Input numberOfLines={20} placeholder='Type your text herekjdhfkadhfuasdhfhsfuarouighkfgoierutoieruoi orighoir ierhgoer oirugoiergu oirgoir go goieru '/>
              </InputGroup>
            </ListItem>
            <ListItem>
              <Button>
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
              </Button>
            </ListItem>
          <ListItem>
            <Button block>
              Add image
            </Button>
          </ListItem>
          <ListItem>
            <Button block>
              Submit
            </Button>
          </ListItem>
          </List>
        </Content>
      </Container>
    )
  }
}

export default AddReview;
