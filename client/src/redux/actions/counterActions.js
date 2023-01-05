import axios from 'axios';
import {
  ADD_EVENT_USER, DELETE_EVENT_USER, SET_COUNTER, SET_EVENT_USERS,
} from '../types';

export const setEventUsers = (eventUsers) => ({ type: SET_EVENT_USERS, payload: eventUsers });
export const addEventUser = (eventUser) => ({ type: ADD_EVENT_USER, payload: eventUser });
export const delEventUser = (id) => ({ type: DELETE_EVENT_USER, payload: id });
export const setCounter = (counter) => ({ type: SET_COUNTER, payload: counter });

export const getEventCounter = (id) => (dispatch) => {
  axios.get(`/counter/event/${id}`)
    .then((res) => {
      dispatch(setCounter(res.data));
      dispatch(setEventUsers(res.data.Users));
    })
    .catch((e) => console.log('error in getting EventCounter', e));
};

export const submitCounter = (id) => (dispatch) => {
  axios.post(`/counter/event/${id}`)
    .then((res) => dispatch(addEventUser(res.data)))
    .catch((error) => console.log('error in submitting Counter', error));
};

export const deleteCounter = (userId, eventId) => (dispatch) => {
  axios.delete(`/counter/event/${eventId}`)
    .then((res) => {
      console.log(res.data, 'res.data');
      dispatch(delEventUser(userId));
    })
    .catch((error) => console.log('error in deleting', error));
};
