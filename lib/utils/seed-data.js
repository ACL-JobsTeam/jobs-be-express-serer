const fetch = require('node-fetch');
const pool = require('./pool');

async function fetchLyft () {
    const data = await fetch('https://boards-api.greenhouse.io/v1/boards/lyft/jobs')
    const json = await data.json()

    

    const company = 'Lyft'

    await json.jobs.forEach(async (job) => {
        return await pool.query(
            `INSERT INTO all_jobs(
                title, company, url, post_date
            )
            VALUES ($1, $2, $3, $4) 
            RETURNING *
            `,
            [job.title, company, job.absolute_url, job.updated_at]
        )
        
    });

   
}

module.exports = fetchLyft;