import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Content, DeckSwiper, List, ListItem, Title, Header, InputGroup, Input, Icon, Button, View, Card, CardItem, Thumbnail, Text } from 'native-base';

const dishes = [
  {
    name: 'Dish One',
    restaurant: "Antoine's",
    menu_type: 'Appetizers',
    image: require('./img/food_one.png'),
    hearts: '12',
    upvotes: '43',
    downvotes: '9',
  }
];

class FoodProfile extends React.Component {
  render () {
    return {
      <Container>
        <Content>
        </Content>
      </Container>
    }
  }
}

export default FoodProfile;
