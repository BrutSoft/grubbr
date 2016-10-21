import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Text, Button, Icon } from 'native-base';
import { openDrawer, closeDrawer } from './actions/drawer';
import { replaceRoute, replaceOrPushRoute, pushNewRoute } from './actions/route';
import { setIndex } from './actions/list';

// function Main(props) {
//   return (
//       <Content>
//         <Button block rounded
//           onPress={() => {
//             props.dispatch({ id: 'findGrub'});
//           }}>
//           Find Grub
//         </Button>
//         <Button block rounded
//           onPress={() => {
//             props.dispatch({ id: 'writeGrub' });
//           }}>
//           Write Grub
//         </Button>
//       </Content>
//   )
// }

class Main extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    replaceRoute: React.PropTypes.func,
    replaceOrPushRoute: React.PropTypes.func,
    pushNewRoute: React.PropTypes.func,
    setIndex: React.PropTypes.func,
    name: React.PropTypes.string,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
  }

  replaceRoute(route) {
    this.props.replaceRoute(route);
  }

  pushNewRoute(route, index) {
    this.props.setIndex(index);
    this.props.pushNewRoute(route);
  }

  render() {
    return (
      <Container>
        <Header>
          <Button transparent onPress={() => this.replaceRoute('login')}>
            <Icon name="ios-power" />
          </Button>

          <Title>Grubbr</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content>
          <Button block rounded
            onPress={() => {
              this.pushNewRoute('findGrub')
            }}>
            Find Grub
          </Button>
          <Button block rounded
            onPress={() => {
              this.pushNewRoute('writeGrub')
            }}>
            Write Grub
          </Button>
          <Button block rounded
            onPress={() => {
              this.pushNewRoute('tender')
            }}>
            Tender
          </Button>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    replaceRoute: route => dispatch(replaceRoute(route)),
    pushNewRoute: route => dispatch(pushNewRoute(route)),
    setIndex: index => dispatch(setIndex(index)),
  };
}

function mapStateToProps(state) {
  return {
    name: state.user.name,
    list: state.list.list,
  };
}

export default connect(null, bindAction)(Main);
