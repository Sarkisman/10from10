import { SET_CLUBID, SET_FILTERED_CLUBS } from '../types';

export default function selectedClubIdReducer(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CLUBID:
      return payload;
    case SET_FILTERED_CLUBS:
      return payload;
    default:
      return state;
  }
}
