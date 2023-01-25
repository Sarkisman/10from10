import axios from 'axios';
import {
  SET_USER, LOGOUT, SET_EMPTY_USER, SET_ERR, SET_EMPTY_ERR,
} from '../types';

export const setUser = (payload) => ({ type: SET_USER, payload }); // функции креаторы
export const logoutUser = () => ({ type: LOGOUT });
export const errAction = (payload) => ({ type: SET_ERR, payload });
export const errEmptyAction = (payload) => ({ type: SET_EMPTY_ERR, payload });

export const checkAuth = () => (dispatch) => { // функции актионы
  axios('/auth/check')
    .then((res) => dispatch(setUser(res.data)))
    .catch(() => dispatch({ type: SET_EMPTY_USER }));
};

export const loginAction = (e, payload) => (dispatch) => {
  e.preventDefault();
  axios.post('/auth/login', payload)
    .then((res) => dispatch(setUser(res.data)))
    .catch((res) => dispatch(errAction(res.response.data)));
};

export const regAction = (e, payload) => (dispatch) => {
  e.preventDefault();
  axios.post('/auth/reg', payload)
    .then((res) => dispatch(setUser(res.data)))
    .catch((res) => dispatch(errAction(res.response.data)));
};

export const logoutThunk = () => (dispatch) => {
  axios('/auth/logout')
    .then(() => dispatch(setUser({})));
};
// диспатч - хук переносчик данных(санки)
