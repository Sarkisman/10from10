import { GET_ONE_CLUB } from '../types';

export default function oneClubReducer(state = null, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ONE_CLUB:
      return payload;
    default:
      return state;
  }
}
