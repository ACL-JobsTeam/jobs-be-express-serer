


const express = require('express');
const { fetchAllCompany } = require('./utils/seed-data');
const flushAllJobsData = require('../lib/utils/flush');

const app = express();
app.use(express.json());
const flushAllJobsData = require('../lib/utils/flush')
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));
const {
    fetchLyft, 
    fetchAirBnB, 
    fetchStripe,
    fetchTwitch,
    fetchCoinbase,
    fetchDiscord
        } = require('./utils/seed-data');
flushAllJobsData()         
fetchDiscord();
fetchLyft();
fetchAirBnB();
fetchStripe();
fetchTwitch();
fetchCoinbase();


flushAllJobsData();
fetchAllCompany();

module.exports = app;
