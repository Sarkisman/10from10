const express = require('express');
const morgan = require('morgan');
// const multer = require('multer'); // мультер
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
// const { Type } = require('./db/models');
const { authRouter, clubRouter } = require('./routes');
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

// app.get('/club/types', async (req, res) => {
//   try {
//     let types = await Type.findAll();
//     types = types.map((el) => el.club_type);
//     res.json(types);
//   } catch {
//     console.log('error');
//   }
// });

app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
