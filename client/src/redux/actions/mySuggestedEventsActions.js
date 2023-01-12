import axios from 'axios';
import { GET_MY_SUGGESTED_EVENTS } from '../types';

export const getMySuggestedEvents = (mySuggestedEvents) => ({ type: GET_MY_SUGGESTED_EVENTS, payload: mySuggestedEvents });

// export const asyncGetMySuggestedEvents = (id) => (dispatch) => {
//   axios.get(`/suggestedByUser/club/${id}`)
//     .then((res) => {
//       dispatch(setUserSuggestedEvents(res.data));
//     })
//     .catch(() => dispatch(setUserSuggestedEvents([])));
// };