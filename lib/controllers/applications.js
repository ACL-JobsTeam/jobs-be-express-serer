const { Router } = require('express');
const pool = require('../utils/pool');

module.exports = Router()
  .get('/getapplications', async (req, res) => {
  
    const query = await pool.query(
      `select c.column_id, array_to_json(array_agg(j)) as jobs_list
        from
        (
          SELECT column_id, name, col_position, unnest(job_pos) AS apps
          FROM columns
        ) c
        inner join
        job_apps j on c.apps = j.app_id
    GROUP BY c.column_id`
    );
  
    res.send(query.rows);
  
  });
