import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Content, DeckSwiper, Title, Header, InputGroup, Input, Icon, Button, View, Card, CardItem, Thumbnail, Text } from 'native-base';

const cards = [
    {
        name: 'Dish One',
        restaurant: "Antoine's",
        image: require('./img/food_one.png'),
        hearts: '12',
        upvotes: '43',
        downvotes: '9',
    },
    {
        name: 'Dish Two',
        restaurant: 'Lelio',
        image: require('./img/food_two.png'),
        hearts: '45',
        upvotes: '23',
        downvotes: '8',
    },
    {
        name: 'Dish Three',
        restaurant: 'Bistro',
        image: require('./img/food_three.png'),
        hearts: '32',
        upvotes: '100',
        downvotes: '67',
    }

];

function BestInTown(props) {
  return (
    <Container>
    <Content>
      <Title>Best In Town</Title>
      </Content>
      <Content>
        <InputGroup borderType='rounded' >
          <Icon name="ios-search" />
          <Input placeholder="Search" />
        </InputGroup>
      </Content>
      <View>
      <Card
        dataArray={cards}
        renderRow={(item) =>
          <CardItem>
            <Thumbnail size={80} source={item.image} />
            <Text>{item.name}</Text>
            <Icon name="ios-heart" style={{ color: '#ED4A6A' }} />
            <Text>{item.hearts}</Text>
            <Icon name="ios-thumbs-up" />
            <Text>{item.upvotes}</Text>
            <Icon name="ios-thumbs-down" />
            <Text>{item.downvotes}</Text>
          </CardItem>
        }>
      </Card>
      </View>
    </Container>
  )
}

export default BestInTown;
