import { GET_MY_CLUB, GET_MY_SUGGESTED_EVENTS } from '../types';

export default function mySuggestedEventsReducer(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MY_SUGGESTED_EVENTS:
      return payload;
    default:
      return state;
  }
}
