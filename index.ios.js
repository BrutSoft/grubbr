/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
//import Reducers from './app/reducers';
import App from './app/app';
import { AppRegistry } from 'react-native';

//const store = createStore(Reducers);

export default class Grubbr extends Component {
  render() {
    return (
      <Provider>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('grubbr', () => grubbr);
