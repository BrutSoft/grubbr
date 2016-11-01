import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Title, Header, InputGroup, Input, Icon, Button, List, ListItem, Picker, View, Text } from 'native-base';
import { Platform, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { openDrawer } from './actions/drawer';
import { replaceRoute, popRoute, pushNewRoute } from './actions/route';
import { setIndex } from './actions/list';
import styles from './components/login/styles';

const Item = Picker.Item;
class AddDish extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    replaceRoute: React.PropTypes.func,
    pushNewRoute: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    setIndex: React.PropTypes.func,
    restaurant: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedTaste: '3',
      selectedMenuType: '4',
      user_id: '1',
      review: null,
      rating: 0,
      restaurantID: this.props.restaurant.id,
      dishName: null,
      image: null,
    };
  }

  onValueChange(value: string) {
    this.setState({
      selectedTaste: value,
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

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response', response);
      if (response.didCancel) {
        console.log('User canceled');
      } else if (response.error) {
        console.log('ImagePicker Error', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button', response.customButton);
      } else {
        let source;
        if (Platform.OS === 'android') {
          source = { uri: response.uri, isStatic: true };
        } else {
          source = { uri: response.uri.replace('file://', ''), isStatic: true };
        }
        this.setState({
          image: source,
        });
      }
    });
  }

  submitDish() {
    return fetch('https://grubbr-api.herokuapp.com/v1/newDish', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: this.state.user_id,
        rating: Number(this.state.rating),
        dishName: this.state.dishName,
        adjective_id: Number(this.state.selectedTaste),
        review: this.state.review,
        restaurandID: this.state.restaurandID,
        menuType: this.state.selectedMenuType,
      }),
    });
  }

  render() {
    return (
      <Container style={styles.bgColor}>
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
          <Title style={styles.title}>Add Dish</Title>
          <List style={styles.box}>
            <ListItem>
              <InputGroup backgroundColor={'#FFFAEE'} borderType="regular" >
                <Input placeholder="Dish name" value={this.state.dishName} onChangeText={text => this.setState({ dishName: text })} />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup backgroundColor={'#FFFAEE'} borderType="regular" >
                <Input style={{ height: 200 }} multiline placeholder="Your review" value={this.state.review} onChangeText={text => this.setState({ review: text })} />
              </InputGroup>
            </ListItem>
            <ListItem>
              <Button transparent value={this.state.rating} onPress={() => this.setState({ rating: 1 })}>
                <Icon name="ios-thumbs-up" />
              </Button>
              <Button transparent value={this.state.rating} onPress={() => this.setState({ rating: -1 })}>
                <Icon name="ios-thumbs-down" />
              </Button>
              <Picker
                style={styles.center}
                iosHeader="Select one"
                mode="dropdown"
                selectedValue={this.state.selectedMenuType}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Item label="Specialty Drinks" value="1" />
                <Item label="Appetizers" value="2" />
                <Item label="Soup/Salad/Side" value="3" />
                <Item label="Entrees" value="4" />
                <Item label="Desserts" value="5" />
                <Item label="Misc" value="6" />
              </Picker>
              <Picker
                style={styles.center}
                iosHeader="Select one"
                mode="dropdown"
                selectedValue={this.state.selectedTaste}
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
            <View style={styles.padding}>
              <Button
                style={styles.border}
                large
                block
                onPress={this.selectPhotoTapped.bind(this)}
              >
                <View>
                  {this.state.image === null ? <Text>Select a Photo</Text> :
                    <Image source={this.state.image} />
               }
                </View>
              </Button>
              <Button
                style={styles.border}
                large
                block
                onPress={() => {
                  this.submitDish();
                  this.pushNewRoute('chooseFood');
                }}
              >
              Submit
              </Button>
            </View>
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
    restaurant: state.search.currentRestaurant,
  };
}

export default connect(mapStateToProps, bindAction)(AddDish);
