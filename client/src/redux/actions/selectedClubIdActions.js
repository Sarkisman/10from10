import axios from 'axios';
import { SET_CLUBID } from '../types';

export const setClubId = (id) => ({ type: SET_CLUBID, payload: id });
