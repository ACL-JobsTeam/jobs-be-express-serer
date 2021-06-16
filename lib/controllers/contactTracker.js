const Router = require('express');
const { ensureJwtAuth } = require('../middleware/check-auth');
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
  })

  .get('/:id', (req, res, next) => {
    ContactTracker.getContactsById(req.params.id)
      .then(contact => res.send(contact))
      .catch(next);
  })

  .put('/:id', ensureJwtAuth,  (req, res, next) => {
    const { id } = req.userData;
    const { companyContact } = req.body;
    ContactTracker.updateContactById(companyContact, req.params.id, id)
      .then(updateContact => res.send(updateContact))
      .catch(next);
  });
