import { GET_TYPES } from '../types';

export default function errReducer(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case GET_TYPES:
      return payload;
    default:
      return state;
  }
}
