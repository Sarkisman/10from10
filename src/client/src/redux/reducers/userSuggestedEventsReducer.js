import { ADD_USER_SUGGESTED_EVENT, DELETE_USER_SUGGESTED_EVENT, SET_USER_SUGGESTED_EVENTS } from '../types';

export default function userSuggestedEventsReducer(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case SET_USER_SUGGESTED_EVENTS:
      return payload; // payload == allComments
    case ADD_USER_SUGGESTED_EVENT:
      return [payload, ...state]; // payload === newComment
    case DELETE_USER_SUGGESTED_EVENT:
      return state.filter((el) => el.id !== payload); // payload === id

    default:
      return state;
  }
}
