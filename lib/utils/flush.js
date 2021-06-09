const pool = require('./pool');

async function flushAllJobsData () {
    return await pool.query(
        `
        DELETE FROM all_jobs RETURNING *
        `
    )
}

module.exports = flushAllJobsData;