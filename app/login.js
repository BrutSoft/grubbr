import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, InputGroup, Input, Button, Icon, View, Header, Title } from 'native-base';

import { replaceRoute, popRoute , pushNewRoute } from './actions/route';
import { setIndex } from './actions/list';
import { setUser } from './actions/user';

import styles from './components/login/styles';
const background = require('./img/background.png');

class Login extends Component {

  static propTypes = {
    setUser: React.PropTypes.func,
    replaceRoute: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
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

  render() {
    return (
      <Container>
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
                <Button style={styles.btn} onPress={() => this.pushNewRoute('main')}>
                  Login
                </Button>
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
  };
}

export default connect(null, bindActions)(Login);
