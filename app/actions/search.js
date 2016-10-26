import type { Action } from './types';

export const SEARCH_DISHES = 'SEARCH_DISHES';

export function searchDishes(query:string, passProps:any):Action {
  return {
    type: SEARCH_DISHES,
    query,
    passProps,
  };
}
