
import React, { Component } from 'react';
import { BackAndroid, Platform, StatusBar, Navigator } from 'react-native';
import { connect } from 'react-redux';
import { Drawer } from 'native-base';

import { closeDrawer } from './actions/drawer';
import { popRoute } from './actions/route';

import Login from './components/login/';
import Home from './components/home/';
import BlankPage from './components/blankPage';
import SplashPage from './components/splashscreen/';
import SideBar from './components/sideBar';
import { statusBarColor } from './themes/base-theme';

Navigator.prototype.replaceWithAnimation = function replaceWithAnimation(route) {
  const activeLength = this.state.presentedIndex + 1;
  const activeStack = this.state.routeStack.slice(0, activeLength);
  const activeAnimationConfigStack = this.state.sceneConfigStack.slice(0, activeLength);
  const nextStack = activeStack.concat([route]);
  const destIndex = nextStack.length - 1;
  const nextSceneConfig = this.props.configureScene(route, nextStack);
  const nextAnimationConfigStack = activeAnimationConfigStack.concat([nextSceneConfig]);

  const replacedStack = activeStack.slice(0, activeLength - 1).concat([route]);
  this._emitWillFocus(nextStack[destIndex]);
  this.setState({
    routeStack: nextStack,
    sceneConfigStack: nextAnimationConfigStack,
  }, () => {
    this._enableScene(destIndex);
    this._transitionTo(destIndex, nextSceneConfig.defaultTransitionVelocity, null, () => {
      this.immediatelyResetRouteStack(replacedStack);
    });
  });
};

export const globalNav = {};

class AppNavigator extends Component {

  static propTypes = {
    drawerState: React.PropTypes.string,
    popRoute: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
  }

  componentDidMount() {
    globalNav.navigator = this._navigator;

    BackAndroid.addEventListener('hardwareBackPress', () => {
      const routes = this._navigator.getCurrentRoutes();

      if (routes[routes.length - 1].id === 'home' || routes[routes.length - 1].id === 'login') {
                // CLose the app
        return false;
      }
      this.popRoute();
      return true;
    });
  }

  componentDidUpdate() {
    // console.log(this.props.routes, 'wdwdwd');
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer.close();
    }
  }

  popRoute() {
    this.props.popRoute();
  }

  openDrawer() {
    this._drawer.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this._drawer.close();
      this.props.closeDrawer();
    }
  }

  renderScene(route, navigator) { // eslint-disable-line class-methods-use-this
    switch (route.id) {
      case 'splashscreen':
        return <SplashPage navigator={navigator} />;
      case 'login':
        return <Login navigator={navigator} />;
      case 'home':
        return <Home navigator={navigator} />;
      case 'blankPage':
        return <BlankPage navigator={navigator} />;
      default :
        return <Login navigator={navigator} />;
    }
  }

  render() {
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        type="overlay"
        content={<SideBar navigator={this._navigator} />}
        tapToClose
        acceptPan={false}
        onClose={() => this.closeDrawer()}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan
      >
        <StatusBar
          backgroundColor={statusBarColor}
          barStyle="default"
        />
        <Navigator
          ref={(ref) => {
            this._navigator = ref;
          }}
          configureScene={() => Navigator.SceneConfigs.FloatFromRight}
          initialRoute={{
            id: (Platform.OS === 'android') ? 'splashscreen' : 'login',
            statusBarHidden: true,
          }}
          renderScene={this.renderScene}
        />
      </Drawer>
    );
  }
}

const bindAction = dispatch => ({
  closeDrawer: () => dispatch(closeDrawer()),
  popRoute: () => dispatch(popRoute()),
});

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
});

export default connect(mapStateToProps, bindAction)(AppNavigator);
