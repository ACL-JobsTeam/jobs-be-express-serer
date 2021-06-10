const Router = require('express');
const ContactTracker = require('../models/ContactTracker');

module.exports = Router()
    .post('/new', (req, res, next) => {
        ContactTracker.insertContact({
            ...req.body
        })
            .then((newContact) => res.send(newContact))
            .catch(next);
    })