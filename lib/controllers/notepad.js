const Router = require('express');
const Notepad = require('../models/Notepad');

module.exports = Router()
    .post('/new', (req, res, next) => {
        Notepad.insertNote({
            ...req.body
        })
            .then((newNote) => res.send(newNote))
            .catch(next);
    })