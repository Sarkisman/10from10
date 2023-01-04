const express = require('express');
const {
  Event_User, User, Event, Club,
} = require('../db/models');

const counterRouter = express.Router();

counterRouter.route('/event/:id')

  .get(async (req, res) => {
    try {
      const eventParticipants = await Event.findOne({ where: { id: +req.params.id }, include: [{ model: User }, { model: Club }] }); // order: [['createdAt', 'DESC']],
      res.json(eventParticipants);
    } catch (error) {
      console.log(error);
    }
  })
  .post(async (req, res) => {
    try {
      await Event_User.findOrCreate({ where: { user_id: req.session.user.id, event_id: req.params.id } });
      const participant = await User.findOne({ where: { id: req.session.user.id } });
      // console.log(participant, 'participant');
      res.json(participant);
    } catch (error) {
      console.log(error);
    }
  })
  .delete(async (req, res) => {
    try {
      await Event_User.destroy({ where: { user_id: req.session.user.id, event_id: req.params.id } });
      // const participant = await User.findOne({ where: { id: req.session.user.id } });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
    }
  });

module.exports = counterRouter;
