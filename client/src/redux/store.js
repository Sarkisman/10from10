import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReduser';
import errReducer from './reducers/errReducer';
import typesReducer from './reducers/typesReducer';
import clubsReducer from './reducers/clubsReducer';
import oneClubReducer from './reducers/oneClubReducer';

import eventsReducer from './reducers/eventsReducer';
import myClubReducer from './reducers/myClubReducer';
import counterReducer from './reducers/counterReducer';
import eventUsersReducer from './reducers/eventUsersReducer';
import commentsReducer from './reducers/commentsReducer';
import selectedClubIdReducer from './reducers/selectedClubIfReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    err: errReducer,
    types: typesReducer,
    clubs: clubsReducer,
    oneClub: oneClubReducer,
    events: eventsReducer,
    club: myClubReducer,
    counter: counterReducer,
    eventUsers: eventUsersReducer,
    comments: commentsReducer,
    selectedClubId: selectedClubIdReducer,
  },
});

export default store;
