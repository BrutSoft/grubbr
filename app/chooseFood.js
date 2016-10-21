import React, { Component } from 'react';
import { Container, Content, Button } from 'native-base';

function Choices(props) {
  return (
      <Content>
        <Button block rounded
          onPress={() => {
            props.dispatch({ id: 'knowWhat'});
          }}>
          I know WHAT I want
        </Button>
        <Button block rounded
          onPress={() => {
            props.dispatch({ id: 'knowWhere' });
          }}>
          I know WHERE I go
        </Button>
        <Button block rounded
          onPress={() => {
            props.dispatch({ id: 'noClue' });
          }}>
          I ain't got a clue
        </Button>
      </Content>
  )
}

export default Choices;
