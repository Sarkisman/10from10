import { ADD_COUNTER, DELETE_COUNTER, SET_COUNTER } from '../types';

export default function counterReducer(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case SET_COUNTER:
      return payload;
    case ADD_COUNTER:
      // console.log('payload', payload);
      // return [payload, ...state];
      return [payload, ...state];
    case DELETE_COUNTER:
      // console.log('payload', payload);
      // return [payload, ...state];
      return state.filter((el) => el.id !== payload); // payload === id
    default:
      return state;
  }
}
