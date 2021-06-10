const express = require('express');
const { fetchAllCompany } = require('./utils/seed-data');
const flushAllJobsData = require('../lib/utils/flush');

const app = express();
const cookieParser = require('cookie-parser');





app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/notes', require('./controllers/notepad.js'));
app.use('/api/v1/events', require('./controllers/eventTracker.js'));
app.use('/api/v1/questions', require('./controllers/questionTracker.js'));
app.use('/api/v1/contacts', require('./controllers/contactTracker.js'));
app.use('/api/v1/auth', require('./controllers/auth'));





app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));
        

flushAllJobsData();
fetchAllCompany();


module.exports = app;
