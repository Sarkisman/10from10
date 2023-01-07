import {
  ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT, SET_COMMENTS,
} from '../types';

export default function commentsReducer(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case SET_COMMENTS:
      return payload; // payload == allComments
    case ADD_COMMENT:
      return [payload, ...state]; // payload === newComment
    case DELETE_COMMENT:
      return state.filter((post) => post.id !== payload); // payload === id
    case EDIT_COMMENT:
      return state.map((post) => (post.id === payload.id ? payload : post)); // payload === updatedComment

    default:
      return state;
  }
}
