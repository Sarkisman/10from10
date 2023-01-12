import axios from 'axios';
import { ADD_USER_SUGGESTED_EVENT, DELETE_USER_SUGGESTED_EVENT, SET_USER_SUGGESTED_EVENTS } from '../types';

export const setUserSuggestedEvents = (allUserSuggestedEvents) => ({ type: SET_USER_SUGGESTED_EVENTS, payload: allUserSuggestedEvents });
export const addUserSuggestedEvent = (oneUserSuggestedEvent) => ({ type: ADD_USER_SUGGESTED_EVENT, payload: oneUserSuggestedEvent });
export const deleteUserSuggestedEvent = (oneUserSuggestedEvent) => ({ type: DELETE_USER_SUGGESTED_EVENT, payload: oneUserSuggestedEvent });

export const asyncSetUserSuggestedEvents = (id) => (dispatch) => {
  axios.get(`/suggestedByUser/club/${id}`)
    .then((res) => {
      dispatch(setUserSuggestedEvents(res.data));
    })
    .catch(() => dispatch(setUserSuggestedEvents([])));
};

export const asyncAddUserSuggestedEvent = (e, input, id) => (dispatch) => {
  e.preventDefault();
  axios.post(`/suggestedByUser/club/${id}`, input)
    .then((res) => {
      dispatch(addUserSuggestedEvent(res.data));
    })
    .catch(console.log);
};

export const asyncDeleteUserSuggestedEvent = (id) => (dispatch) => {
  axios.delete(`/suggestedByUser/event/${id}`)
    .then(() => dispatch((deleteUserSuggestedEvent(id))))
    .catch(console.log);
};
