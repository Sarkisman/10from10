const express = require('express');
const nodemailer = require('nodemailer');
const {
  UserSuggestedEvents, Club,
} = require('../db/models');

const transporter = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 465,
  secure: true,
  auth: {
    user: 'Khmara2Khmara@yandex.ru',
    pass: 'Wdwg2dinw5',
  },
});
// Функция отправка данных на почту
async function sendemail(email, text) {
  const mailOptions = {
    from: 'Khmara2Khmara@yandex.ru',
    to: email,
    subject: 'Новая заявка.',
    text,
  };
  await transporter.sendMail(mailOptions);
}
const textEmail = (title, description, date, num_of_members, email) => `Заявка на проведение мероприятия:
  Название: ${title}
  Описание: ${description}
  Дата: ${date}
  Кол-во участников: ${num_of_members}
  Почта заявителя: ${email}`;

const userSuggestedEventsRouter = express.Router();

userSuggestedEventsRouter.route('/club/:id')
  .post(async (req, res) => {
    try {
      const {
        email, title, description, date, num_of_members,
      } = req.body;
      if (!email || !description || !date || !num_of_members) return res.status(400).json({ message: 'Для отправки заявки необходимо заполнить все поля формы' });

      await UserSuggestedEvents.create({
        title,
        description,
        date,
        club_id: Number(req.params.id),
        user_id: req.session.user.id,
        num_of_members: Number(num_of_members),
        email,
      });

      const club = await Club.findOne({ where: { id: req.params.id } });
      const clubEmail = club.email;
      await sendemail(clubEmail, textEmail(title, description, date, num_of_members, email));
      res.status(200).json({ message: 'Ваша заявка отправлена! Ожидайте подтверждения заказа на Email!' });
    } catch (error) {
      console.log(error);
    }
  });

module.exports = userSuggestedEventsRouter;
