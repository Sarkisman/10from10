const express = require('express');
const {
  Event, User, Club,
} = require('../db/models');

const eventsRouter = express.Router();

eventsRouter.route('/')
  .get(async (req, res) => {
    const allEvents = await Event.findAll({ order: [['createdAt', 'DESC']], include: Club });
    res.json(allEvents);
  });

eventsRouter.route('/club/:id')
  .get(async (req, res) => {
    const allEvents = await Event.findAll({ where: { club_id: +req.params.id }, order: [['createdAt', 'DESC']], include: Club });
    res.json(allEvents);
  });

eventsRouter.get('/club/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const oneEvent = await Event.findOne({ where: { id } });
    res.json(oneEvent);
  } catch (error) {
    res.sendStatus(500);
  }
});

eventsRouter.route('/new/:id')
  .post(async (req, res) => {
    try {
      const {
        title, description, date, num_of_members, time,
      } = req.body;
      console.log(typeof time);
      const newEvent = await Event.create({
        title,
        description,
        date,
        time,
        club_id: Number(req.params.id),
        num_of_members: +num_of_members,
      });
      res.json(newEvent);
    } catch (error) {
      console.log(error);
    }
  });

eventsRouter.route('/user/:id')
  .get(async (req, res) => {
    const userEvents = await User.findOne({ where: { id: +req.params.id }, include: { model: Event } });
    res.json(userEvents.Events);
  });

eventsRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Event.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = eventsRouter;
