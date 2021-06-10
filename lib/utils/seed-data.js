const fetch = require('node-fetch');
const pool = require('./pool');

const companies = ['lyft', 'airbnb', 'stripe', 'discord', 'coinbase', 'twitch'];

async function fetchAllCompany() {
  await companies.forEach((company) => fetchCompany(company));
}

async function fetchCompany(company) {
  const data = await fetch(
    `https://boards-api.greenhouse.io/v1/boards/${company}/jobs`
  );
  const json = await data.json();

  await json.jobs.forEach(async (job) => {
    return await pool.query(
      `INSERT INTO all_jobs(
                title, company, url, post_date, location
            )
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *
            `,
      [job.title, company, job.absolute_url, job.updated_at, job.location.name]
    );
  });
}

module.exports = {
  fetchAllCompany,
};
