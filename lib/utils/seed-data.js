const fetch = require('node-fetch');
const pool = require('./pool');

async function fetchLyft () {
    const data = await fetch('https://boards-api.greenhouse.io/v1/boards/lyft/jobs')
    const json = await data.json()
   
    const company = 'Lyft'

    await json.jobs.forEach(async (job) => {
        return await pool.query(
            `INSERT INTO all_jobs(
                title, company, url, post_date, location
            )
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *
            `,
            [job.title, company, job.absolute_url, job.updated_at, job.location.name]
        )
    });
}

async function fetchAirBnB () {
    const data = await fetch('https://boards-api.greenhouse.io/v1/boards/airbnb/jobs')
    const json = await data.json()

    const company = 'AirBnB'

    await json.jobs.forEach(async (job) => {
        return await pool.query(
            `INSERT INTO all_jobs(
                title, company, url, post_date, location
            )
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *
            `,
            [job.title, company, job.absolute_url, job.updated_at, job.location.name]
        )
    });
}

async function fetchStripe () {
    const data = await fetch('https://boards-api.greenhouse.io/v1/boards/stripe/jobs')
    const json = await data.json()

    const company = 'Stripe'

    await json.jobs.forEach(async (job) => {
        return await pool.query(
            `INSERT INTO all_jobs(
                title, company, url, post_date, location
            )
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *
            `,
            [job.title, company, job.absolute_url, job.updated_at, job.location.name]
        )
    });
}

async function fetchTwitch () {
    const data = await fetch('https://boards-api.greenhouse.io/v1/boards/twitch/jobs')
    const json = await data.json()

    const company = 'Twitch'

    await json.jobs.forEach(async (job) => {
        return await pool.query(
            `INSERT INTO all_jobs(
                title, company, url, post_date, location
            )
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *
            `,
            [job.title, company, job.absolute_url, job.updated_at, job.location.name]
        )
    });
}

async function fetchCoinbase () {
    const data = await fetch('https://boards-api.greenhouse.io/v1/boards/coinbase/jobs')
    const json = await data.json()

    const company = 'Coinbase'

    await json.jobs.forEach(async (job) => {
        return await pool.query(
            `INSERT INTO all_jobs(
                title, company, url, post_date, location
            )
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *
            `,
            [job.title, company, job.absolute_url, job.updated_at, job.location.name]
        )
    });
}

async function fetchDiscord () {
    const data = await fetch('https://boards-api.greenhouse.io/v1/boards/discord/jobs')
    const json = await data.json()

    const company = 'Discord'

    await json.jobs.forEach(async (job) => {
        return await pool.query(
            `INSERT INTO all_jobs(
                title, company, url, post_date, location
            )
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *
            `,
            [job.title, company, job.absolute_url, job.updated_at, job.location.name]
        )
    });

}
module.exports = {
    fetchLyft, 
    fetchAirBnB, 
    fetchStripe,
    fetchTwitch,
    fetchCoinbase,
    fetchDiscord
};