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
    reviews: [
      'Awesome taste, I will absolutely come back to grab them once again'
    ],
  }
];

class FoodProfile extends React.Component {
  render () {
    return (
      <Container>
        <Content>
          <List
            dataArray={dishes}
            renderRow={(dish) =>
              <Card>
              <CardItem>
                <Text>{dish.name}</Text>
                <Icon name="ios-heart" style={{ color: '#ED4A6A' }} />
                <Text>{dish.hearts}</Text>
                <Icon name="ios-thumbs-up" />
                <Text>{dish.upvotes}</Text>
                <Icon name="ios-thumbs-down" />
                <Text>{dish.downvotes}</Text>
              </CardItem>
              <CardItem>
                <Image style={{height: 150}} source={dish.image} />
              </CardItem>
              <CardItem>
                <Text style={{width: 250}} >{dish.reviews}</Text>
                <Button transparent>
                  <Icon name="ios-thumbs-up" />
                </Button>
                <Button transparent>
                  <Icon name="ios-thumbs-down" />
                </Button>
              </CardItem>
              </Card>
            }>
          </List>
        </Content>
      </Container>
    )
  }
}

export default FoodProfile;
