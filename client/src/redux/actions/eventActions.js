import axios from 'axios';

import {
  ADD_EVENT, DELETE_EVENT, SET_EVENT, SET_EVENTS, UPDATE_EVENT,
} from '../types';

export const setEvents = (events) => ({ type: SET_EVENTS, payload: events });
export const setEvent = (event) => ({ type: SET_EVENT, payload: event });
export const addEvent = (newEvent) => ({ type: ADD_EVENT, payload: newEvent });
export const deleteEvent = (eventId) => ({ type: DELETE_EVENT, payload: eventId });
export const editEvent = (editedId) => ({ type: UPDATE_EVENT, payload: editedId });
// export const emptyEvents = () => ({ type: EMPTY_E });

export const getEvents = () => (dispatch) => {
  axios.get('/events')
    .then((res) => dispatch(setEvents(res.data)))
    .catch((e) => console.log('error in getting Events', e));
};

export const getEventsByClub = (id) => (dispatch) => {
  axios.get(`/events/club/${id}`)
    .then((res) => dispatch(setEvents(res.data)))
    .catch((e) => console.log('error in getting Events', e));
};

export const getOneEvent = (id) => (dispatch) => {
  axios.get(`/events/club/${id}`)
    .then((res) => dispatch(setEvent(res.data)))
    .catch((err) => console.log('error', err));
};

export const submitEvent = (e, payload, id) => (dispatch) => {
  e.preventDefault();
  axios.post(`/events/new/${id}`, payload)
    .then((res) => {
      dispatch(addEvent(res.data));
    })
    .catch((er) => console.log('error in submitting Event', er));
};

export const getEventsByUser = (id) => (dispatch) => {
  axios(`/events/user/${id}`)
    .then((res) => dispatch(setEvents(res.data)));
};

export const asyncDelete = (id) => (dispatch) => {
  axios.delete(`/events/${id}`)
    .then(() => dispatch(deleteEvent(id)))
    .catch((err) => console.log('error in deleting Event', err));
};

// export const asyncEdit = (id, event, value) => (dispatch) => {
//   console.log({
//     title: event.title, description: event.description, tgLink: event.tgLink, date: value,
//   });
//   axios.patch(`/events/${id}/edit`, {
//     title: event.title, description: event.description, tgLink: event.tgLink, date: value,
//   })
//     .then((res) => dispatch(editEvent(res.data)))
//     .catch((err) => console.log('error in editing Event', err));
// };
