const { hash, compare } = require('bcrypt');
const express = require('express');
const cors = require('cors');
const multer = require('multer'); // мультер

const { User } = require('../db/models');

const userRouter = express.Router();

userRouter.use(cors({
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

userRouter.post('/login', async (req, res) => {
  const { name, password } = req.body;
  // console.log(req.body);

  if (!name || !password) return res.status(400).json({ message: 'Все поля обязательны для заполнения!' });
  // ищем user в БД по email
  const user = await User.findOne({ where: { name } });
  // если не находим сообщаем что введенные им данные неверны
  if (!user) return res.status(400).json({ message: 'Неверно введена почта или пароль пользователя!' });

  // сравниваем введеный пароль и захэшированый пароль из БД;
  const isPassValid = await compare(password, user.password);
  // если не сходится сообщаем что введенные им данные неверны
  if (!isPassValid) return res.status(400).json({ message: 'Неверно введён логин или пароль пользователя!' });

  req.session.user = {
    id: user.id, name: user.name, email: user.email,
  };
  if (req.session.user) {
    return res.json(req.session.user);
  } return res.json(null);
});

userRouter.post('/reg', async (req, res) => {
  const { name, email, password } = req.body;// забираем все нужные свойства;
  // console.log(req.body);
  // если user ввел только пароль или только логин возвращаем сообщение которое покажем под формой
  if (!name || !email || !password) return res.status(400).json({ message: 'Все поля должны быть заполнены!' });
  // пароль был введен? тогда хэшируем его
  const hashPassword = await hash(password, 10);

  const [user, isCreated] = await User.findOrCreate({ // метод ищет в базе и если не нахит зап-ет
    // возвращает при этом найденный обьект и false либо созданный объект и true
    where: { email },
    defaults: { name, email, password: hashPassword },
  });

  if (!isCreated) return res.status(400).json({ message: 'Вы уже зарегистрированны, пройдите в авторизацию!' });

  req.session.user = { id: user.id, name: user.name, email: user.email };

  return res.json(req.session.user);
});

userRouter.get('/check', (req, res) => {
  // try {
  if (req?.session?.user) {
    // console.log(req?.session?.user);
    return res.json(req?.session?.user);
  }
  // } catch {
  return res.sendStatus(401);
  // }
});

userRouter.get('/logout', (req, res) => {
  // Удалить куку
  req.session.destroy(); // Завершить сессию
  res.clearCookie('user_sid').sendStatus(200);
});

userRouter.get('/', async (req, res) => {
  const user = await User.findOne({ where: { id: req.session.user.id } });
  const { avatar } = user;
  res.json(avatar);
});

userRouter.post('/avatar', upload.single('avatar'), async (req, res) => {
  // console.log('reqFile =======>', req.file.path);
  await User.update({ avatar: req.file.path.slice(7) }, { where: { id: req.session.user.id } });
  const oneUser = await User.findOne({ where: { id: req.session.user.id } });
  res.json(oneUser);
});

module.exports = userRouter;
