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
    user_id, input: { clubName, address, email }, select, longitude, latitude,
  } = req.body;
  try {
    const [club, isCreated] = await Club.findOrCreate({
      where: { user_id },
      defaults: {
        user_id, name: clubName, email, address, longitude, latitude, avatar: 'ZaglushkaClub.jpeg',
      },
    });
    await select.map(async (el) => await Club_Type.create(
      { club_id: club.id, type_id: el.id },
    ));
    res.json(club);
  } catch {
    console.log('error');
  }
});
// все клубы
clubRouter.get('/clubs', async (req, res) => {
  const allClubs = await Club.findAll({ include: { model: Type } });
  res.json(allClubs);
});
// один клуб
clubRouter.get('/oneclub', async (req, res) => {
  const oneClub = await Club.findOne({ where: { user_id: req.session.user.id } });
  res.json(oneClub);
});

clubRouter.patch('/:id', upload.single('avatar'), async (req, res) => {
  try {
    const {
      name, phone, email, address, description,
    } = req.body;
    const { id } = req.params;
    // console.log(req.file.path);
    if (req.body.avatar !== 'undefined') {
      await Club.update({
        name, phone, email, address, description, avatar: req.file.path.slice(7),
      }, { where: { id } });
    } else {
      await Club.update({
        name, phone, email, address, description,
      }, { where: { id } });
    }
    res.sendStatus(200);
  } catch { console.log('err'); }
});

clubRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const club = await Club.findOne({ where: { user_id: id } });
    res.json(club);
  } catch { console.log('err'); }
});

module.exports = clubRouter;
