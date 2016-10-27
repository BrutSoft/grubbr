import type { Action } from './types';

export const SEARCH_DISHES = 'SEARCH_DISHES';
export const SEARCH_DISHES_NEAR_ME = 'SEARCH_DISHES_NEAR_ME';
export const SET_CURRENT_DISH = 'SET_CURRENT_DISH';

const API_URL = 'https://grubbr-api.herokuapp.com/v1/tender'

export function searchDishes(query:string, passProps:any):Action {
  return {
    type: SEARCH_DISHES,
    query,
    passProps,
  };
}

export function searchDishesNearMe(passProps:any):Action {
  // TODO:
  // http://redux.js.org/docs/advanced/AsyncActions.html
  const dishFetch = fetch(API_URL)
    .then(response => response.json());
  return {
    type: SEARCH_DISHES_NEAR_ME,
    payload: data,
    passProps,
  };
}

export function setCurrentDish(dish:Object, passProps:any):Action {
  return {
    type: SET_CURRENT_DISH,
    payload: dish,
    passProps,
  };
}
