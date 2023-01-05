import { ADD_EVENT_USER, DELETE_EVENT_USER, SET_EVENT_USERS } from '../types';

export default function eventUsersReducer(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case SET_EVENT_USERS:
      return payload;
    case ADD_EVENT_USER:
      return [payload, ...state];
    case DELETE_EVENT_USER:
      return state.filter((el) => el.id !== payload);
    default:
      return state;
  }
}
