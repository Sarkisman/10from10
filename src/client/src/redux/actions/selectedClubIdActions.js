import axios from 'axios';
import { SET_CLUBID, SET_FILTERED_CLUBS } from '../types';

export const setClubId = (id) => ({ type: SET_CLUBID, payload: id });
export const setFilteredClubs = (filteredClubs) => ({ type: SET_FILTERED_CLUBS, payload: filteredClubs });
