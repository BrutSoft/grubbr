import 'react-native';
import React from 'react';
<<<<<<< cd3fc301b29ab312d0317c7aa98c7a037e29d0e8
import Grubbr from '../index.ios.js';
=======
import grubbr from '../index.ios.js';
>>>>>>> add jest config for render testing

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
<<<<<<< cd3fc301b29ab312d0317c7aa98c7a037e29d0e8
    <Grubbr />
=======
    <grubbr />
>>>>>>> add jest config for render testing
  );
});
