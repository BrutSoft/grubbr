import type { Action } from '../actions/types';
import { SET_LOCATION } from '../actions/location';

export type State = {
  location: Object,
}

const initialState = {
  location: {},
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_LOCATION) {
    return {
      ...state,
      location: action.location,
    };
  }

  return state;
}
