const Router = require('express');
const NoteTracker = require('../models/NoteTracker');

module.exports = Router()
    .post('/new', (req, res, next) => {
        NoteTracker.insertNote({
            ...req.body
        })
            .then((newNote) => res.send(newNote))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        NoteTracker.deleteNoteById(req.params.id)
        .then((note) => res.send(note))
        .catch(next)
    })