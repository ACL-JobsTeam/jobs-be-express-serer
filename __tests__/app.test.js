const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const fetchLyft = require('../lib/utils/seed-data');
const fetch  = require('node-fetch');

describe('jobs-be-serer routes', () => {
  beforeEach(() => {
    return setup(pool);
  });


 
  
});
