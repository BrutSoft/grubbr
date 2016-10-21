import React, { Component } from 'react';
import { Container, Content, Button, Card } from 'native-base';

function Main(props) {
  return (
      <Content>
        <Button block rounded
          onPress={() => {
            props.dispatch({ id: 'findGrub'});
          }}>
          Find Grub
        </Button>
        <Button block rounded
          onPress={() => {
            props.dispatch({ id: 'writeGrub' });
          }}>
          Write Grub
        </Button>
      </Content>
  )
}

export default Main;
