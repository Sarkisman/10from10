/* eslint-disable no-unused-vars */
/* eslint-disable no-return-await */
const express = require('express');
const cors = require('cors');
const multer = require('multer'); // мультер
const { Type, Club, Club_Type } = require('../db/models');

const clubRouter = express.Router();

clubRouter.use(cors({
  credentials: true,
  origin: true,
}));

const storage = multer.diskStorage({ // хранилище img
  destination(req, file, cb) {
    cb(null, './images');
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}.jpeg`); // имя файла
  },
});

// const types = ['image/png', 'image/jpeg', 'image/jpg']; // типы файлов

// const fileFilter = (req, file, cb) => { // проверка на тип файла
//   if (types.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

const upload = multer({ storage });

clubRouter.get('/types', async (req, res) => {
  try {
    const types = await Type.findAll();
    res.json(types);
  } catch {
    console.log('error');
  }
});

clubRouter.post('/types', async (req, res) => {
  const {
    user_id, input: { clubName, address }, select, longitude, latitude,
  } = req.body;
  try {
    const [club, isCreated] = await Club.findOrCreate({
      where: { user_id },
      defaults: {
        user_id, name: clubName, address, longitude, latitude, avatar: 'ZaglushkaClub.jpeg',
      },
    });
    // await Club_Type.create({ club_id: club.id, type_id: el.id });
    await select.map(async (el) => await Club_Type.create(
      { club_id: club.id, type_id: el.id },
    ));
  } catch {
    console.log('error');
  }
});
// все клубы
clubRouter.get('/clubs', async (req, res) => {
  const allClubs = await Club.findAll();
  res.json(allClubs);
});
// один клуб
clubRouter.get('/oneclub', async (req, res) => {
  const oneClub = await Club.findOne({ where: { user_id: req.session.user.id } });
  res.json(oneClub);
});

clubRouter.patch('/:id', upload.single('avatar'), async (req, res) => {
  console.log(req.body);
  // try {
  const { id } = req.params;
  console.log({
    avatar: req.file.path,
  });
  await Club.update({
    ...req.body, avatar: req.file.path.slice(7),
  }, { where: { id } });
  // } catch { console.log('err'); }
});

clubRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const club = await Club.findOne({ where: { user_id: id } });
    console.log(club, '===========================');
    res.json(club);
  } catch { console.log('err'); }
});

module.exports = clubRouter;
