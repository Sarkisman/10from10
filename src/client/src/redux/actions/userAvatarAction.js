import axios from 'axios';
import {
  SET_USER_AVATAR,
} from '../types';

export const setAvatar = (payload) => ({ type: SET_USER_AVATAR, payload });

export const getAvatar = () => (dispatch) => {
  axios.get('/auth')
    .then((res) => dispatch(setAvatar(res.data)));
};

export const setUserAvatar = (data) => (dispatch) => {
  axios.post('/auth/avatar', data)
    .then((res) => dispatch(setAvatar(res.data)));
};
