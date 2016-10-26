
import type { Action } from '../actions/types';
import { SET_CURRENT_DISH, SEARCH_DISHES_NEAR_ME } from '../actions/search';

export type State = {
    currentDish: Object,
    dishesNearMe: Object,
}

const initialState = {
  currentDish: {},
  dishesNearMe: {},
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_CURRENT_DISH) {
    return {
      ...state,
      currentDish: action.payload,
    };
  }

  if (action.type === SEARCH_DISHES_NEAR_ME) {
    return {
      ...state,
      dishesNearMe: action.payload,
    };
  }

  return state;
}
