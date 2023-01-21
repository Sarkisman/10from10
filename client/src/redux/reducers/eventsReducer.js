import {
  ADD_EVENT, DELETE_EVENT, SET_EVENTS, UPDATE_EVENT,
} from '../types';

export default function eventsReducer(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case SET_EVENTS:
      return payload;
    case ADD_EVENT:
      return [payload, ...state];
    case DELETE_EVENT:
      return state.filter((event) => event.id !== payload);
    case UPDATE_EVENT:
      return state.map((event) => (event.id === payload.id ? payload : event));
    default:
      return state;
  }
}
