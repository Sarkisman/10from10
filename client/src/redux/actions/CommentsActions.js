import axios from 'axios';
import {
  ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT, SET_COMMENTS,
} from '../types';

export const setComments = (allComments) => ({ type: SET_COMMENTS, payload: allComments });
export const addComment = (oneComment) => ({ type: ADD_COMMENT, payload: oneComment });
export const deleteComment = (oneComment) => ({ type: DELETE_COMMENT, payload: oneComment });
export const editComment = (editedComment) => ({ type: EDIT_COMMENT, payload: editedComment });

export const asyncSetComments = () => (dispatch) => {
  axios.get('/comments')
    .then((res) => {
      dispatch(setComments(res.data));
    })
    .catch(() => dispatch(setComments([])));
};

export const asyncAddComment = (e, input, id) => (dispatch) => {
  e.preventDefault();
  axios.post(`/comments/${id}`, { text: input })
    .then((res) => {
      console.log('IN ACTIOONNNNNNS', res.data);
      dispatch(addComment(res.data));
    })
    .catch(console.log);
};

export const asyncDeleteComment = (id) => (dispatch) => {
  axios.delete(`/comments/${id}`)
    .then(() => dispatch((deleteComment(id))))
    .catch(console.log);
};

export const asyncEditComment = (e, id, text) => (dispatch) => {
  e.preventDefault();
  axios.patch(`/comments/edit/${id}`, { text })
    .then((res) => dispatch(editComment(res.data)))
    .catch(console.log);
};
