import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReduser';
import errReducer from './reducers/errReducer';
import typesReducer from './reducers/typesReducer';
import clubsReducer from './reducers/clubsReducer';
import oneClubReducer from './reducers/oneClubReducer';
import userAvatarReducer from './reducers/userAvatarReducer';
import eventsReducer from './reducers/eventsReducer';
import myClubReducer from './reducers/myClubReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    err: errReducer,
    types: typesReducer,
    clubs: clubsReducer,
    oneClub: oneClubReducer,
    userAvatar: userAvatarReducer,
    events: eventsReducer,
    club: myClubReducer,
  },
});

export default store;
