import { GET_ALL_FOTOS } from '../types';

export default function eventPhotoReducer(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_FOTOS:
      return payload;
    default:
      return state;
  }
}
