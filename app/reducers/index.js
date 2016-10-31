
import { combineReducers } from 'redux';

import drawer from './drawer';
import route from './route';
import user from './user';
import list from './list';
import search from './search';
import location from './location';

export default combineReducers({

  drawer,
  route,
  user,
  list,
  search,
  location,

});
