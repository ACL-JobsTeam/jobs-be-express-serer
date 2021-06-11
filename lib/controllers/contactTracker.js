const Router = require('express');
const ContactTracker = require('../models/ContactTracker');

module.exports = Router()
  .post('/new', (req, res, next) => {
    ContactTracker.insertContact({
      ...req.body,
    })
      .then((newContact) => res.send(newContact))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    ContactTracker.deleteContactById(req.params.id)
      .then((contact) => res.send(contact))
      .catch(next);
  });
