const Router = require('express');
const JobTracker = require('../models/JobTracker');

module.exports = Router()
  .get('/all', (req, res, next) => {
    JobTracker.selectAllJobs()
      .then((jobs) => res.send(jobs))
      .catch(next);
  })

  .get('/:company', (req, res, next) => {
    JobTracker.selectByCompany(req.params.company)
      .then((jobs) => res.send(jobs))
      .catch(next);
  });
