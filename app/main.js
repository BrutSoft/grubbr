import React, { Component } from 'react';
import { Container, Content, Button } from 'native-base';

function Main(props) {
  return (
    <Container>
      <Content>
        <Button>
          Find Grub
        </Button>
        <Button>
          Write Grub
        </Button>
      </Content>
    </Container>
  )
}

module.exports = Main;
