const Router = require('express');
const { ensureJwtAuth } = require('../middleware/check-auth');
const JobTracker = require('../models/JobTracker');
const pool = require('../utils/pool');


module.exports = Router()
  .get('/all', (req, res, next) => {
    JobTracker.selectAllJobs()
      .then((jobs) => res.send(jobs))
      .catch(next);
  })

  .get('/:company', (req, res, next) => {
    JobTracker.selectByCompany(req.params.company)
      .then((jobs) => res.send(jobs))
      .catch(next);
  })

  .post('/savejob', ensureJwtAuth, async (req, res, next) => {
    const { title, company, url } = req.body;
    const { userId } = req.userData;

    // Insert application in to DB    
    const { rows } = await pool.query(
      `INSERT INTO job_apps (position, company, job_url, linked_user_id) 
      VALUES 
      ($1, $2, $3, $4)
      RETURNING *;`,
      [title, company, url, userId]
    );
    const newAppId = rows[0].app_id;
    
    // Get the user's associated is_archived column_id.
    const querySelectCol = await pool.query(
      `SELECT column_id, job_pos FROM columns WHERE is_archive='true' AND linked_user_id=$1`,
      [userId]
    );

    const { column_id, job_pos } = await querySelectCol.rows[0];
    job_pos.unshift(Number(newAppId));

    // Insert the new application's ID into the column's app positions.
    const queryUpdate = await pool.query(
      `UPDATE columns 
      SET job_pos = $1
      WHERE column_id = $2 AND linked_user_id=$3
      RETURNING *`,
      [job_pos, column_id, userId]
    );

    res.sendStatus(200);
  });
