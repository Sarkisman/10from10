import axios from 'axios';
import {
  GET_TYPES,
  GET_CLUBS,
  GET_ONE_CLUB,

} from '../types';

export const getTypes = (payload) => ({ type: GET_TYPES, payload });

export const getClubs = (payload) => ({ type: GET_CLUBS, payload });

export const getOneClub = (payload) => ({ type: GET_ONE_CLUB, payload });

export const getTypesAction = () => (dispatch) => {
  axios('/club/types')
    .then((res) => dispatch(getTypes(res.data)));
};

export const sendDataClub = (input) => (dispatch) => {
  console.log('input:', input);
  axios.post('/club/types', input)
    .then((res) => dispatch(getTypes(res.data)));
};

export const sendClubAvatar = (data, id) => () => {
  console.log('input:', data, id);
  axios.post(`/club/avatar/${id}`, data);
  // .then((res) => dispatch(getTypes(res.data)))
};

export const getAllClubs = () => (dispatch) => {
  axios('/clubs')
    .then((res) => dispatch(getClubs(res.data)));
};

export const getSingleClub = () => (dispatch) => {
  axios('/oneclub')
    .then((res) => dispatch(getOneClub(res.data)));
};
