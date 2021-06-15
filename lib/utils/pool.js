/* eslint-disable no-console */
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Use when connected to Heroku.
  ssl: !process.env.CI ? { rejectUnauthorized: false } : undefined
  // Works for local PG instance.
  // ssl: process.env.PGSSLMODE && { rejectUnauthorized: false },
});

pool.on('connect', () => console.log('Postgres connected'));

module.exports = pool;
