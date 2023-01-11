const express = require('express');
const { Comment, User } = require('../db/models');

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res) => {
  const allComments = await Comment.findAll({
    order: [['createdAt', 'DESC']],
    include: { model: User },
  });
  res.json(allComments);
});

commentsRouter.post('/:id', async (req, res) => {
  const { text } = req.body;
  const newComment = await Comment.create({ text, user_id: req.session.user.id, event_id: req.params.id });
  const oneComment = await Comment.findOne({
    where: {
      id: newComment.id,
    },
    include: { model: User, attributes: ['id', 'name', 'avatar'] },

  });
  res.json(oneComment);
});

commentsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Comment.destroy({ where: { id } });
    return res.sendStatus(200);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

commentsRouter.patch('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    await Comment.update({ text }, {
      where: { id },
    });
    const updatedComment = await Comment.findOne({
      where: { id },
      include: { model: User, attributes: ['id', 'name'] },

    });
    res.json(updatedComment);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = commentsRouter;
