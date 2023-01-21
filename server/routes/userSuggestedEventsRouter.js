const express = require('express');
const nodemailer = require('nodemailer');
const {
  UserSuggestedEvents, Club, User,
} = require('../db/models');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});
// Функция отправка данных на почту
async function sendemail(email, text) {
  const mailOptions = {
    from: 'shootingclubs@yandex.ru',
    to: email,
    subject: 'Новая заявка.',
    text,
  };
  await transporter.sendMail(mailOptions);
}
const textEmail = (title, description, date, time, num_of_members, email) => `Заявка на проведение мероприятия:
  Название: ${title}
  Описание: ${description}
  Дата: ${date}
  Время начала: ${time}
  Кол-во участников: ${num_of_members}
  Почта заявителя: ${email}`;

const userSuggestedEventsRouter = express.Router();

userSuggestedEventsRouter.route('/club/:id')
  .get(async (req, res) => {
    const allEventsSuggestedByUser = await UserSuggestedEvents.findAll({
      where: { club_id: Number(req.params.id) },
      order: [['createdAt', 'DESC']],
      include: { model: User },
    });
    res.json(allEventsSuggestedByUser);
  })
  .post(async (req, res) => {
    try {
      const {
        title, description, date, time, num_of_members, email,
      } = req.body;

      if (!email || !description || !date || !time || !num_of_members) return res.status(400).json({ message: 'Для отправки заявки необходимо заполнить все поля формы' });
      console.log('WHERE?', req.body);
      const userSuggestedEvent = await UserSuggestedEvents.create({
        title,
        description,
        date,
        time,
        club_id: Number(req.params.id),
        user_id: req.session.user.id,
        num_of_members: Number(num_of_members),
        email,
      });
      res.json(userSuggestedEvent);

      const club = await Club.findOne({ where: { id: req.params.id } });
      const clubEmail = club.email;
      await sendemail(clubEmail, textEmail(title, description, date, time, num_of_members, email));
    } catch (error) {
      console.log(error);
    }
  });

userSuggestedEventsRouter.delete('/event/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await UserSuggestedEvents.destroy({ where: { id } });
    return res.sendStatus(200);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

module.exports = userSuggestedEventsRouter;
