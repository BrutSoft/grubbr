import React, { Component } from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

import { replaceRoute, pushNewRoute } from './actions/route';
import { setUser } from './actions/user';
import { setIndex } from './actions/list';

import styles from './components/login/styles';

const background = require('./img/background2.png');

class Login extends Component {

  static propTypes = {
    setUser: React.PropTypes.func,
    replaceRoute: React.PropTypes.func,
    pushNewRoute: React.PropTypes.func,
    setIndex: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
    };
  }

  componentDidMount() {
    this._setupGoogleSignin();
  }

  setUser(name) {
    this.props.setUser(name);
  }

  replaceRoute(route) {
    this.setUser(this.state.name);
    this.props.replaceRoute(route);
  }

  pushNewRoute(route, index) {
    this.props.setIndex(index);
    this.props.pushNewRoute(route);
  }

  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        // scopes: ["https://www.googleapis.com/auth/drive.readonly"],
        iosClientId: '643134965705-upe81se7scqfv274e6gamf2ovcj60k8m.apps.googleusercontent.com',
        webClientId: '643134965705-upe81se7scqfv274e6gamf2ovcj60k8m.apps.googleusercontent.com',
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
      console.log(user);
      this.setState({ user });
    }
    catch (err) {
      console.log('Google signin error', err.code, err.message);
    }
  }

  _signIn() {
    GoogleSignin.signIn()
    .then((user) => {
      console.log(user);
      this.setState({user: user});
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }

  _signOut() {
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
      this.setState({user: null});
    })
    .done();
  }


  render() {
    return (
      <Container style={styles.bgColor}>
        <View style={styles.container}>
          <Content>
            <Image source={background} style={styles.shadow}>
              <View style={styles.bg}>
                <InputGroup style={styles.input}>
                  <Icon name="ios-person" />
                  <Input placeholder="EMAIL" onChangeText={name => this.setState({ name })} />
                </InputGroup>
                <InputGroup style={styles.input}>
                  <Icon name="ios-unlock-outline" />
                  <Input
                    placeholder="PASSWORD"
                    secureTextEntry
                  />
                </InputGroup>
                <GoogleSigninButton
                  style={{ width: 48, height: 48 }}
                  size={GoogleSigninButton.Size.Icon}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={this._signIn.bind(this)}
                />
                <TouchableOpacity onPress={() => { this._signOut(); }}>
                  <View style={{ marginTop: 50 }}>
                    <Text>Log out</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Image>
          </Content>
        </View>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    replaceRoute: route => dispatch(replaceRoute(route)),
    pushNewRoute: route => dispatch(pushNewRoute(route)),
    setIndex: index => dispatch(setIndex(index)),
    setUser: name => dispatch(setUser(name)),
  };
}

export default connect(null, bindActions)(Login);
