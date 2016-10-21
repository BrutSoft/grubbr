import React, { Component } from 'react';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import { Button } from 'native-base';

class Login extends Component {
  render() {
    return (
      <FBLogin />
    );
  }
};

export default Login;
