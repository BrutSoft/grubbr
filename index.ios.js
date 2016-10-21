/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
//import Reducers from './app/reducers';
import AppNavigator from './app/AppNavigator';
import { AppRegistry } from 'react-native';
import setup from './app/setup';

//const store = createStore(Reducers);

export default class Grubbr extends Component {
  render() {
    return (
      <Provider>
        <AppNavigator />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('grubbr', setup);
