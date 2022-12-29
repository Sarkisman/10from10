const express = require('express');
const { Event_User } = require('../db/models');

const counterRouter = express.Router();

counterRouter.route('/event/:id')
  .get(async (req, res) => {
    const eventParticipants = await Event_User.findAll({ order: [['createdAt', 'DESC']], where: { event_id: req.params.id } });
    res.json(eventParticipants);
  })
  .post(async (req, res) => {
    try {
      const newParticipant = await Event_User.findOrCreate({ where: { user_id: req.session.user.id, event_id: req.params.id } });
      res.json(newParticipant);
    } catch (error) {
      console.log(error);
    }
  });

module.exports = counterRouter;
