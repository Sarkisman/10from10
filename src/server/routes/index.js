const authRouter = require('./authRouter');
const clubRouter = require('./clubRouter');
const eventsRouter = require('./eventsRouter');
const counterRouter = require('./counterRouter');
const commentsRouter = require('./commentsRouter');
const userSuggestedEventsRouter = require('./userSuggestedEventsRouter');

module.exports = {
  authRouter, clubRouter, eventsRouter, counterRouter, commentsRouter, userSuggestedEventsRouter,
};
