const Router = require('express');
const EventTracker = require('../models/EventTracker');

module.exports = Router()
  .post('/new', (req, res, next) => {
    EventTracker.insertEvent({
      ...req.body,
    })
      .then((newEvent) => res.send(newEvent))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    EventTracker.deleteEventById(req.params.id)
      .then((event) => res.send(event))
      .catch(next);
  });
