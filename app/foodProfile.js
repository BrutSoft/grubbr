import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Content, DeckSwiper, List, ListItem, Title, Header, InputGroup, Input, Icon, Button, View, Card, CardItem, Thumbnail, Text } from 'native-base';

const dishes = [
  {
    name: 'Dish One fuckin adorbz dish yeah',
    restaurant: "Antoine's",
    menu_type: 'Appetizers',
    image: require('./img/food_one.png'),
    hearts: '12',
    upvotes: '43',
    downvotes: '9',
    adjective: 'spicy',
    dish_type: 'Thai',
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
          <Card
            dataArray={dishes}
            renderRow={(dish) =>
              <Card>
                <CardItem>
                  <Text>{dish.name}</Text>
                  <Text note>{dish.dish_type}          {dish.restaurant}</Text>
                </CardItem>
                <ListItem>
                  <Text>Tastes {dish.adjective}  </Text>
                  <Button transparent>
                    <Icon name="ios-heart" style={{ color: '#ED4A6A' }} />
                  </Button>
                  <Text>{dish.hearts}</Text>
                  <Button transparent>
                    <Icon name="ios-thumbs-up" />
                  </Button>
                  <Text>{dish.upvotes}</Text>
                  <Button transparent>
                    <Icon name="ios-thumbs-down" />
                  </Button>
                  <Text>{dish.downvotes}</Text>
                  <Button transparent>
                    <Icon name="ios-clipboard" />
                    <Text>Write review</Text>
                  </Button>
                </ListItem>
                <CardItem cardBody>
                  <Image style={{height: 150}} source={dish.image} />
                </CardItem>
                <CardItem>
                  <Thumbnail size={80} source={dish.image} />
                </CardItem>
                <ListItem>
                  <Text style={{width: 280}} >{dish.reviews}</Text>
                  <Button transparent>
                    <Icon name="ios-thumbs-up" />
                  </Button>
                  <Button transparent>
                    <Icon name="ios-thumbs-down" />
                  </Button>
                </ListItem>
              </Card>
            }>
          </Card>
        </Content>
      </Container>
    )
  }
}

export default FoodProfile;
