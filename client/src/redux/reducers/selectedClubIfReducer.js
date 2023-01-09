import { SET_CLUBID } from '../types';

export default function selectedClubIdReducer(state = '', action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CLUBID:
      return payload;
    default:
      return state;
  }
}
