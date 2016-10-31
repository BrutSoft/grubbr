
import type { Action } from '../actions/types';
import { SET_CURRENT_DISH, SEARCH_DISHES_NEAR_ME, SET_TENDER_DATA, SET_TENDER_INDEX, SET_CURRENT_RESTAURANT, SEARCH_RESTAURANTS_NEAR_ME } from '../actions/search';

export type State = {
    currentDish: Object,
    dishesNearMe: Promise,
    tenderData: Array,
    tenderIndex: Number,
    currentRestaurant: Object,
    restaurantsNearMe: Promise,
}

const initialState = {
  currentDish: {},
  dishesNearMe: {},
  tenderData: [],
  tenderIndex: 0,
  currentRestaurant: {},
  restaurantsNearMe: {},
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_CURRENT_DISH) {
    console.log('in reducer')
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

  if (action.type === SET_CURRENT_RESTAURANT) {
    return {
      ...state,
      currentRestaurant: action.payload,
    };
  }

  if (action.type === SEARCH_RESTAURANTS_NEAR_ME) {
    return {
      ...state,
      restaurantsNearMe: action.payload,
    };
  }

  return state;
}
