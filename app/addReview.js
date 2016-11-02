import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Title, Header, InputGroup, Input, Icon, Button, List, ListItem, Picker, View, Grid, Row, Thumbnail } from 'native-base';
import { Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { openDrawer } from './actions/drawer';
import { replaceRoute, popRoute, pushNewRoute } from './actions/route';
import { setIndex } from './actions/list';
import styles from './components/login/styles';

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
      image: [],
      displayImage: undefined,
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
        adjective_id: Number(this.state.selected),
        image: `data:image/png;base64,${this.state.image}`,
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
          <Title style={styles.title}>Add Review</Title>
          <List style={styles.box}>
            <ListItem>
              <InputGroup backgroundColor={'#FFFAEE'} borderType="regular" >
                <Input style={{ height: 200 }} multiline placeholder="Type your text" value={this.state.review} onChangeText={text => this.setState({ review: text })} />
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
            <Thumbnail size={80} source={{ uri: this.state.displayImage }} />
            <Grid style={styles.padding}>
              <Row style={{ height: 100 }}>
                <View>
                  <Button
                    style={styles.border}
                    large
                    block
                    onPress={this.selectPhotoTapped.bind(this)}
                  >
                Select a Photo
                  </Button>
                </View>
              </Row>
              <Row style={{ height: 100 }}>
                <View>
                  <Button
                    style={styles.border}
                    large
                    block
                    onPress={() => {
                      this.submitReview();
                      this.pushNewRoute('chooseFood');
                    }}
                  >
              Submit
                  </Button>
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
