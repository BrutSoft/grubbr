import type { Action } from './types';

export const SEARCH_DISHES = 'SEARCH_DISHES';
export const SEARCH_DISHES_NEAR_ME = 'SEARCH_DISHES_NEAR_ME';
export const SET_CURRENT_DISH = 'SET_CURRENT_DISH';
export const SET_TENDER_DATA = 'SET_TENDER_DATA';

const API_URL = 'https://grubbr-api.herokuapp.com/v1/tender';

export function searchDishes(query:string, passProps:any):Action {
  return {
    type: SEARCH_DISHES,
    query,
    passProps,
  };
}

export function searchDishesNearMe(passProps:any):Action {
  return {
    type: SEARCH_DISHES_NEAR_ME,
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

export function setTenderData(data:Array, passProps:any):Action {
  return {
    type: SET_TENDER_DATA,
    payload: data,
    passProps,
  }
}
