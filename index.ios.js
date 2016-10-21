/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppNavigator from './app/AppNavigator';
import { AppRegistry } from 'react-native';
import setup from './app/setup';

AppRegistry.registerComponent('grubbr', setup);
