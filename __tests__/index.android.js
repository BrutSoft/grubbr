import 'react-native';
import React from 'react';
import Grubbr from '../index.android.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Grubbr />
  );
});
