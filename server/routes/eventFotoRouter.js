const express = require('express');
const cors = require('cors');
const multer = require('multer'); // мультер
const { ClubPhoto } = require('../db/models');

const eventFotoRouter = express.Router();

eventFotoRouter.use(cors({
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

const upload = multer({ storage });

eventFotoRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const AllPhotos = await ClubPhoto.findAll({ where: { event_id: id } });
    res.json(AllPhotos);
  } catch {
    console.log('error');
  }
});

eventFotoRouter.post('/:id', upload.array('img'), async (req, res) => {
  const { id } = req.params;
  const incomingFoto = req.files;
  incomingFoto.map((oneFoto) => (ClubPhoto.create({ img: oneFoto.path.slice(7), event_id: id, isAllowed: false })));
});

module.exports = eventFotoRouter;
