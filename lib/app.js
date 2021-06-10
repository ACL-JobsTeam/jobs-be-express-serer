const express = require('express');
const { fetchAllCompany } = require('./utils/seed-data');
const flushAllJobsData = require('../lib/utils/flush');

const app = express();
app.use(express.json());

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

flushAllJobsData();
fetchAllCompany();

module.exports = app;
