const express = require('express');
const app = express();
const getJobs = require('./utils/seed-data')
app.use(express.json());

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

getJobs()

module.exports = app;
