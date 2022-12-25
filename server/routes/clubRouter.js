/* eslint-disable no-return-await */
const express = require('express');
const { Type, Club, Club_Type } = require('../db/models');

const clubRouter = express.Router();

clubRouter.get('/types', async (req, res) => {
  try {
    const types = await Type.findAll();
    res.json(types);
  } catch {
    console.log('error');
  }
});

clubRouter.post('/types', async (req, res) => {
  const { user_id, input: { clubName, address }, select } = req.body;
  console.log(select, '=======================');
  try {
    const [club, isCreated] = await Club.findOrCreate({
      where: { name: clubName },
      defaults: {
        user_id, name: clubName, address,
      },
    });
    // await Club_Type.create({ club_id: club.id, type_id: el.id });
    await select.map(async (el) => await Club_Type.create(
      { club_id: club.id, type_id: el.id },
    ));
    // console.log(club);
  } catch {
    console.log('error');
  }
});

module.exports = clubRouter;
