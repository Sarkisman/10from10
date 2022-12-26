import { GET_CLUBS } from '../types';

export default function clubsReducer(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CLUBS:
      return payload;
    default:
      return state;
  }
}
