import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReduser';
import errReducer from './reducers/errReducer';
import typesReducer from './reducers/typesReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    err: errReducer,
    types: typesReducer,
  },
});

export default store;
