import type { Action } from './types';

export const SEARCH_DISHES = 'SEARCH_DISHES';
export const SET_CURRENT_DISH = 'SET_CURRENT_DISH';

export function searchDishes(query:string, passProps:any):Action {
  return {
    type: SEARCH_DISHES,
    query,
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
