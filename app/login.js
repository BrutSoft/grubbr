import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';

import { replaceRoute } from './actions/route';
import { setUser } from './actions/user';

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

  render() {
    return (
      <Container>
        <View>
          <Content>
              <View>
                <InputGroup>
                  <Icon name="ios-person" />
                  <Input placeholder="EMAIL" onChangeText={name => this.setState({ name })} />
                </InputGroup>
                <InputGroup>
                  <Icon name="ios-unlock-outline" />
                  <Input
                    placeholder="PASSWORD"
                    secureTextEntry
                  />
                </InputGroup>
                <Button onPress={() => this.replaceRoute('main')}>
                  Login
                </Button>
              </View>
          </Content>
        </View>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    replaceRoute: route => dispatch(replaceRoute(route)),
    setUser: name => dispatch(setUser(name)),
  };
}

export default connect(null, bindActions)(Login);
