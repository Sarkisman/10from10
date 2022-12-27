import {
  SET_USER_AVATAR,
} from '../types';

export default function userAvatarReducer(state = null, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_USER_AVATAR:
      return payload;
    default:
      return state;
  }
}
