import React, { Component } from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Button, Icon, View } from 'native-base';
import { GoogleSignin } from 'react-native-google-signin';

import { replaceRoute, pushNewRoute } from './actions/route';
import { setUser } from './actions/user';
import { setIndex } from './actions/list';

import styles from './components/login/styles';
import { iosClientId, webClientId } from '../clientId.config';

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
        iosClientId,
        webClientId,
        offlineAccess: false,
      });

      const user = await GoogleSignin.currentUserAsync();
      console.log(user);
      this.setState({ user });
    } catch (err) {
      console.log('Google signin error', err.code, err.message);
    }
  }

  _signIn() {
    GoogleSignin.signIn()
    .then((user) => {
      console.log(user);
      this.setState({ user });
      this.pushNewRoute('choices');
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
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
                <TouchableOpacity>
                  <Button
                    large
                    style={styles.border}
                    block
                    onPress={() => this._signIn()}
                  >
                    <Text>Sign in with Google</Text>
                    <Icon name="logo-google" />
                  </Button>
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
