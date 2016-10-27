
import type { Action } from '../actions/types';
import { SET_CURRENT_DISH, SEARCH_DISHES_NEAR_ME, SET_TENDER_DATA, SET_TENDER_INDEX } from '../actions/search';

export type State = {
    currentDish: Object,
    dishesNearMe: Promise,
    tenderData: Array,
    tenderIndex: Number,
}

const initialState = {
  currentDish: {},
  dishesNearMe: {},
  tenderData: [],
  tenderIndex: 0,
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_CURRENT_DISH) {
    return {
      ...state,
      currentDish: action.payload,
    };
  }

  if (action.type === SET_TENDER_DATA) {
    return {
      ...state,
      tenderData: action.payload,
    };
  }

  if (action.type === SET_TENDER_INDEX) {
    return {
      ...state,
      tenderIndex: action.index,
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
