import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Title, Header, InputGroup, Input, Icon, Button, List, ListItem, Picker, View, Row, Grid, Thumbnail } from 'native-base';
import { Platform, ActionSheetIOS } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { openDrawer } from './actions/drawer';
import { replaceRoute, popRoute, pushNewRoute } from './actions/route';
import { setIndex } from './actions/list';
import { setCurrentDish } from './actions/search';
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
    setCurrentDish: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedTaste: '3',
      selectedMenuType: '4',
      user_id: '1',
      review: undefined,
      restaurantID: this.props.restaurant.id,
      dishName: undefined,
      image: undefined,
      responseImage: undefined,
      responseReview: undefined,
      responseDish: undefined,
      submited: false,
      picturePicked: false,
      dishNameSet: false,
      reviewSet: false,
      pictureSet: false,
      dish: undefined,
      isGrubbed: false,
    };
  }

  onValueChange(value: string) {
    this.setState({
      selectedTaste: value,
    });
  }

  onValueChange1(value: string) {
    this.setState({
      selectedMenuType: value,
    });
  }

  setCurrentDish(dish) {
    this.props.setCurrentDish(dish);
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
          image: response.data,
          displayImage: source.uri,
        });
      }
    });
  }

  submitDish() {
    if (this.state.dishNameSet && this.state.reviewSet && this.state.pictureSet) {
      if (this.state.review.length > 140) {
        alert('What a mouthful! Please keep your review under 140 characters.')
      } else {
        const options = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: this.state.user_id,
            rating: Number(this.state.isGrubbed ? 1 : 0),
            name: this.state.dishName,
            adjective_id: Number(this.state.selectedTaste),
            review: this.state.review,
            restaurant_id: this.state.restaurantID,
            menu_type_id: this.state.selectedMenuType,
            image: `data:image/png;base64,${this.state.image}`,
          }),
        };
        return fetch(`https://grubbr-api.herokuapp.com/v1/newdish?access_token=${this.props.user.access_token}`, options)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          responseImage: responseJson.data[0].results.image,
          responseDish: responseJson.data[0].results.name,
          responseReview: responseJson.data[0].results.review,
          dish: responseJson.data[0].results,
          submitted: true,
          review: undefined,
          dishName: undefined,
        });
      });
    }
    } else {
      alert('All fields are required');
    }
  }

  showShareActionSheet() {
    ActionSheetIOS.showShareActionSheetWithOptions({
      url: this.state.responseImage,
      message: `My review on Grubbr about ${this.state.responseDish}: ${this.state.responseReview}`,
    },
    error => alert(error),
    (success) => {
      if (success) {
        console.log('Shared');
      } else {
        console.log("Didn't share");
      }
    });
  }

  renderButton() {
    if (!this.state.submitted) {
      return (
        <Row style={{ height: 100 }}>
          <View>
            <Button
              style={styles.border}
              large
              block
              onPress={() => {
                this.submitDish();
              }}
            >
    Submit
            </Button>
          </View>
        </Row>
      );
    } else {
      return (
        <Row style={{ height: 100 }}>
          <View>
            <Button
              style={styles.border}
              large
              block
              onPress={() => {
                this.showShareActionSheet();
              }}
            >
    Share
            </Button>
          </View>
          <View>
            <Button
              style={styles.border}
              large
              block
              onPress={() => {
                this.setCurrentDish(this.state.dish);
                this.pushNewRoute('foodProfile');
              }}
            >
    Leave
            </Button>
          </View>
        </Row>
      );
    }
  }

  renderPicture() {
    if (this.state.picturePicked) {
      return (
        <ListItem>
          <Thumbnail style={{ width: 300, height: 100 }} alignSelf={'center'} source={{ uri: this.state.displayImage }} />
        </ListItem>
      );
    }
    return (
      <List />
    );
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
          <Title style={styles.oddTitles}>Add Dish</Title>
          <List style={styles.box}>
            <ListItem>
              <InputGroup backgroundColor={'#FFFAEE'} borderType="regular" >
                <Input placeholder="Dish name" value={this.state.dishName} onChangeText={text => this.setState({ dishName: text, dishNameSet: true })} />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup backgroundColor={'#FFFAEE'} borderType="regular" >
                <Input style={{ height: 100 }} multiline placeholder="Leave your review here!" value={this.state.review} onChangeText={text => this.setState({ review: text, reviewSet: true })} />
              </InputGroup>
            </ListItem>
            <ListItem>
              <Button
                style={this.state.pressStatus ? styles.thumbPressed : styles.thumb}
                onPress={() => {
                  this.setState({ isGrubbed: !this.state.isGrubbed });
                }}
              >
                <Icon name="ios-thumbs-up" />
              </Button>
              <Picker
                style={styles.center}
                iosHeader="Select one"
                mode="dropdown"
                selectedValue={this.state.selectedMenuType}
                onValueChange={this.onValueChange1.bind(this)}
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
            {this.renderPicture()}
            <Grid style={styles.padding}>
              <Row style={{ height: 100 }}>
                <View>
                  <Button
                    style={styles.border}
                    large
                    block
                    onPress={() => {
                      this.selectPhotoTapped();
                      this.setState({
                        picturePicked: true,
                        pictureSet: true,
                      });
                    }}
                  >
                Select a Photo
                  </Button>
                </View>
              </Row>
              <Row style={{ height: 100 }}>
                <View>
                  {this.renderButton()}
                </View>
              </Row>
            </Grid>
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
    setCurrentDish: dish => dispatch(setCurrentDish(dish)),
  };
}

function mapStateToProps(state) {
  return {
    name: state.user.name,
    list: state.list.list,
    restaurant: state.search.currentRestaurant,
    user: state.user.user,
  };
}

export default connect(mapStateToProps, bindAction)(AddDish);
