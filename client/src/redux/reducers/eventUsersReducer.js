import { ADD_EVENT_USER, DELETE_EVENT_USER, SET_EVENT_USERS } from '../types';

export default function eventUsersReducer(state = [], action) {
  console.log('delete', state, action);
  const { type, payload } = action;
  console.log('payload', payload);
  switch (type) {
    case SET_EVENT_USERS:
      return payload;
    case ADD_EVENT_USER:
      // console.log('payload', payload);
      return [payload, ...state];
    case DELETE_EVENT_USER:
      // console.log('payload', payload);
      // return [payload, ...state];
      // return state.filter((el) => el.id !== payload); // payload ===  user.id
      return state.filter((el) => el.id !== 10); // payload ===  user.id

    default:
      return state;
  }
}
