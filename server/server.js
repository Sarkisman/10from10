const express = require('express');
const morgan = require('morgan');
// const multer = require('multer'); // мультер
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const {
  authRouter, clubRouter, eventsRouter, counterRouter, commentsRouter, userSuggestedEventsRouter,
} = require('./routes');
const eventFotoRouter = require('./routes/eventFotoRouter');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors({
  credentials: true,
  origin: true,
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('images'));
app.use(session({
  name: 'user_sid',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: true,
  store: new FileStore(),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
}));

app.use('/auth', authRouter);
app.use('/club', clubRouter);
app.use('/events', eventsRouter);
app.use('/counter', counterRouter);
app.use('/comments', commentsRouter);
app.use('/suggestedByUser', userSuggestedEventsRouter);
app.use('/fotos', eventFotoRouter);

app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
