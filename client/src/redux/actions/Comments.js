import axios from 'axios';
import {
  GET_COMMENTS,
} from '../types';

export const getComments = (payload) => ({ type: GET_COMMENTS, payload });

export const getCommentsAction = () => (dispatch) => {
  axios('/comments')
    .then((res) => dispatch(getComments(res.data)));
};

// export const sendDataClub = (input) => (dispatch) => {
//   axios.post('/club/types', input)
//     .then((res) => dispatch(getTypes(res.data)));
// };
