import { GET_COMMENTS } from '../types';

export default function commentsReducer(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case GET_COMMENTS:
      return payload;
    default:
      return state;
  }
}
