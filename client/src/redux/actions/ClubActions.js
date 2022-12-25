import axios from 'axios';
import {
  GET_TYPES,
} from '../types';

export const getTypes = (payload) => ({ type: GET_TYPES, payload });

export const getTypesAction = () => (dispatch) => {
  axios('/club/types')
    .then((res) => dispatch(getTypes(res.data)));
};

export const sendDataClub = (input) => (dispatch) => {
  axios.post('/club/types', input)
    .then((res) => dispatch(getTypes(res.data)));
};
