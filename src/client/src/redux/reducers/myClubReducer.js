import { GET_MY_CLUB } from '../types';

export default function myClubReducer(state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MY_CLUB:
      return payload;
    default:
      return state;
  }
}
