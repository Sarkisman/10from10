const express = require('express');
const { Event_User, User, Event } = require('../db/models');

const counterRouter = express.Router();

counterRouter.route('/event/:id')

  .get(async (req, res) => {
    try {
      const eventParticipants = await Event.findOne({ where: { id: +req.params.id }, include: { model: User } }); // order: [['createdAt', 'DESC']],
      res.json(eventParticipants);
    } catch (error) {
      console.log(error);
    }
  })
  .post(async (req, res) => {
    try {
      const newParticipant = await Event_User.findOrCreate({ where: { user_id: req.session.user.id, event_id: req.params.id } });
      // const participant = await User.findOne({ where: { id: req.session.user.id } });
      res.json(newParticipant);
    } catch (error) {
      console.log(error);
    }
  });

module.exports = counterRouter;
