import {
  SET_USER, LOGOUT, SET_EMPTY_USER, SET_USER_AVATAR,
} from '../types';

export default function userReducer(state = { isFetching: true }, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      return payload;
    case SET_EMPTY_USER:
      return null;
    case SET_USER_AVATAR:
      return { ...state, avatar: payload };
    case LOGOUT:
      return null;

    default:
      return state;
  }
}
