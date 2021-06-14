const express = require('express');
const { fetchAllCompany } = require('./utils/seed-data');
const flushAllJobsData = require('../lib/utils/flush');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

app.use(
  cors({
    origin: 'http://localhost:7891',
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/jobs', require('./controllers/jobTracker.js'));
app.use('/api/v1/notes', require('./controllers/noteTracker.js'));
app.use('/api/v1/events', require('./controllers/eventTracker.js'));
app.use('/api/v1/questions', require('./controllers/questionTracker.js'));
app.use('/api/v1/contacts', require('./controllers/contactTracker.js'));
app.use('/api/v1/auth', require('./controllers/auth'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

flushAllJobsData();
fetchAllCompany();

module.exports = app;
