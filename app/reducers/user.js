
import type { Action } from '../actions/types';
import { SET_USER } from '../actions/user';

export type State = {
    user: Object
}

const initialState = {
  user: {},
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_USER) {
    return {
      ...state,
      user: action.payload,
    };
  }
  return state;
}
