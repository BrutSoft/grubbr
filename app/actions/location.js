import type { Action } from './types';

export const SET_LOCATION = 'SET_LOCATION';

export function setLocation(location:Object, passProps:any):Action {
  return {
    type: SET_LOCATION,
    location,
    passProps,
  };
}
