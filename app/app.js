import React from 'react';
import { Container, Content, Header, Title } from 'native-base';
import { Grid } from 'react-native-easy-grid';
import Main from './main';
//import Choices from './chooseFood';
//import BestInTown from './bestInTown';
//import FoodTender from './foodTender';
//import RatedMenu from './ratedMenu';
import FoodProfile from './foodProfile';

const App = () => (
  <Container>
    <Header>
      <Title>Grubbr</Title>
    </Header>
    <Content>
      <FoodProfile />
    </Content>
  </Container>
);

export default App;
