import axios from 'axios';
import {
  GET_TYPES,
} from '../types';

export const getTypes = (payload) => ({ type: GET_TYPES, payload });

export const getTypesAction = () => (dispatch) => {
  axios('/auth/check')
    .then((res) => dispatch(getTypes(res.data)));
};
