import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReduser';
import errReducer from './reducers/errReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    err: errReducer,
  },
});

export default store;
