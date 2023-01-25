import axios from 'axios';
import {
  GET_TYPES,
  GET_CLUBS,
  GET_ONE_CLUB,
  GET_MY_CLUB,
} from '../types';

export const getTypes = (payload) => ({ type: GET_TYPES, payload });
export const getClubs = (payload) => ({ type: GET_CLUBS, payload });
export const getOneClub = (payload) => ({ type: GET_ONE_CLUB, payload });
export const getMyClub = (payload) => ({ type: GET_MY_CLUB, payload });

export const getTypesAction = () => (dispatch) => {
  axios('/club/types')
    .then((res) => dispatch(getTypes(res.data)));
};

export const sendDataClub = (input) => (dispatch) => {
  axios.post('/club/types', input)
    .then((res) => dispatch(getMyClub(res.data))); // ??
};

export const sendClubAvatar = (data, id) => () => {
  // console.log('input:', data, id);
  axios.post(`/club/avatar/${id}`, data);
  // .then((res) => dispatch(getTypes(res.data)))
};

export const getAllClubs = () => (dispatch) => {
  axios('/club/clubs')
    .then((res) => dispatch(getClubs(res.data)));
};

export const getSingleClub = () => (dispatch) => {
  axios('/club/oneclub')
    .then((res) => dispatch(getOneClub(res.data)));
};

export const checkHaveClub = (id) => (dispatch) => {
  axios(`/club/${id}`)
    .then((res) => dispatch(getMyClub(res.data)));
};

export const changeClubThunk = (id, data) => (dispatch) => {
  console.log(data);
  axios.patch(`/club/${id}`, data)
    .then((res) => dispatch(getMyClub(res.data)));
};
