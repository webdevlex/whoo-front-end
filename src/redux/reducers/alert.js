/* eslint-disable */
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      // If i want to keep old errors
      return [...state, payload];
    case REMOVE_ALERT:
      return [];
    default:
      return state;
  }
}
