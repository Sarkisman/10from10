import axios from 'axios';
import {
  GET_ALL_FOTOS,
} from '../types';

export const getFotos = (allFotos) => ({ type: GET_ALL_FOTOS, payload: allFotos });

export const asyncSendFotos = (id, data) => (dispatch) => {
  axios
    .post(`/fotos/${id}`, data);
};

export const asyncGetFotos = (id) => (dispatch) => {
  axios(`/fotos/${id}`).then((res) => {
    dispatch(getFotos(res.data));
  });
};
