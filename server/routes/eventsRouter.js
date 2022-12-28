const express = require('express');
const { Event, Club } = require('../db/models');
// const subscriber = require('../db/models/subscriber');

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
    // console.log(error);
    res.sendStatus(500);
  }
});

eventsRouter.route('/new/:id')
  .post(async (req, res) => {
    console.log('__________________________________________________________', req.params.id);
    console.log(',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,', req.body.num_of_members);
    try {
      const {
        title, description, date, num_of_members,
      } = req.body;
      const newEvent = await Event.create({
        title,
        description,
        date: new Date(date),
        club_id: req.params.id,
        num_of_members: +num_of_members,
      });
      // const eventWithUser = await Event.findByPk(newEvent.id, { include: User });
      res.json(newEvent);
    } catch (error) {
      console.log(error);
    }
  });

// eventsRouter.route('/joiners')
//   .get(async (req, res) => {
//     const allJoiners = await Subscriber.findAll({ order: [['createdAt', 'DESC']], include: User });
//     res.json(allJoiners);
//   })
//   .post(async (req, res) => {
//     try {
//       const newJoiner = await Subscriber.findOrCreate({
//         userId: req.session.user.id, eventId: req.params,
//       });
//       res.json(newJoiner);
//     } catch (error) {
//       console.log(error);
//     }
//   });

// eventsRouter.delete('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Event.destroy({ where: { id } });
//     // await Subscriber.destroy({ where: { eventId: req.params.id, userId: req.session.user.id } });
//     res.sendStatus(200);
//   } catch (error) {
//     // console.log(error);
//     res.sendStatus(500);
//   }
// });

// eventsRouter.patch('/:id/edit', async (req, res) => {
//   try {
//     const {
//       title, description, date, tgLink,
//     } = req.body;
//     const fin = {
//       title, description, date: new Date(date), tgLink, userId: req.session.user.id,
//     };
//     // console.log(fin, ' fin');
//     const { id } = req.params;
//     await Event.update(fin, { where: { id } });
//     res.sendStatus(200);
//   } catch (error) {
//     // console.log(error);
//     res.sendStatus(500);
//   }
// });

module.exports = eventsRouter;
