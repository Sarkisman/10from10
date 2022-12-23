import { SET_ERR, SET_EMPTY_ERR } from '../types';

export default function errReducer(state = '', action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ERR:
      return payload;
    case SET_EMPTY_ERR:
      return '';
    default:
      return state;
  }
}
