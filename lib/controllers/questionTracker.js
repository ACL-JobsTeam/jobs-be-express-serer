const Router = require('express');
const QuestionTracker = require('../models/QuestionTracker');

module.exports = Router()
    .post('/new', (req, res, next) => {
        QuestionTracker.insertQuestion({
            ...req.body
        })
            .then((newEvent) => res.send(newEvent))
            .catch(next);
    })