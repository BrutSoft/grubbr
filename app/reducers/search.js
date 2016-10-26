
import type { Action } from '../actions/types';
import { SET_CURRENT_DISH } from '../actions/search';

export type State = {
    currentDish: Object
}

const initialState = {
  currentDish: {},
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_CURRENT_DISH) {
    return {
      ...state,
      currentDish: action.payload,
    };
  }
  return state;
}
