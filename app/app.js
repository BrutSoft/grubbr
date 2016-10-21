import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Header, Title, Text, View } from 'native-base';
import AppNavigator from './AppNavigator';
import theme from './themes/base-theme';
import { Grid } from 'react-native-easy-grid';
import Main from './main';
//import Choices from './chooseFood';
//import BestInTown from './bestInTown';
//import FoodTender from './foodTender';
//import RatedMenu from './ratedMenu';
import FoodProfile from './foodProfile';

const App = () => (
  <AppNavigator />
);

export default App;
