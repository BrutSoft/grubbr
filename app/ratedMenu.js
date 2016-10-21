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
  },
  {
    name: 'Dish Two',
    restaurant: 'Lelio',
    menu_type: 'Soups & Salads',
    image: require('./img/food_two.png'),
    hearts: '45',
    upvotes: '23',
    downvotes: '8',
  },
  {
    name: 'Dish Three',
    restaurant: 'Bistro',
    menu_type: 'Entrees',
    image: require('./img/food_three.png'),
    hearts: '32',
    upvotes: '100',
    downvotes: '67',
  },
  {
    name: 'Dish Four',
    restaurant: 'Bistro',
    menu_type: 'Entrees',
    image: require('./img/food_three.png'),
    hearts: '32',
    upvotes: '104',
    downvotes: '67',
  }
];

function RatedMenu(props) {
  return (
    <Container>
    <Content>
      <Title>Rated Menu</Title>
        <InputGroup borderType='rounded' >
          <Icon name="ios-search" />
          <Input placeholder="Search" />
        </InputGroup>
        <List
          dataArray={dishes}
          renderRow={(dish) =>
            <Card>
            <ListItem itemDivider rounded>
              <Text>{dish.menu_type}</Text>
            </ListItem>
            <ListItem>
              <Text>{dish.name}</Text>
              <Icon name="ios-thumbs-up" />
              <Text>{dish.upvotes - dish.downvotes}</Text>
            </ListItem>
            </Card>
          }>
        </List>
        </Content>
    </Container>
  )
}

export default RatedMenu;
