const Router = require('express');
const QuestionTracker = require('../models/QuestionTracker');

module.exports = Router()
  .post('/new', (req, res, next) => {
    QuestionTracker.insertQuestion({
      ...req.body,
    })
      .then((newEvent) => res.send(newEvent))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    QuestionTracker.deleteQuestionById(req.params.id)
      .then((question) => res.send(question))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    QuestionTracker.getQuestionsById(req.params.id)
      .then(question => res.send(question))
      .catch(next);
  })