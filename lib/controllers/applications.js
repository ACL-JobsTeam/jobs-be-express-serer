const { Router } = require('express');
const { ensureJwtAuth } = require('../middleware/check-auth');
const pool = require('../utils/pool');

module.exports = Router()
  .get('/getapplications', ensureJwtAuth, async (req, res) => {
    const { userId } = req.userData;

    //REMOVED HARD CODE & USING JWT NOW

    const query = await pool.query(
      `select col.column_id, array_to_json(array_agg(j ORDER BY array_pos)) as jobs_list
      from
      (
        SELECT column_id, name, app_id, array_pos
        FROM columns, unnest(job_pos)
        WITH ORDINALITY AS T (app_id, array_pos)
        WHERE linked_user_id=$1
        ) col
        inner join
        job_apps j on col.app_id = j.app_id
      
        GROUP BY col.column_id`,
      [userId]
    );
  
    res.send(query.rows);
  
  })

  .patch('/updatecolapplications', ensureJwtAuth, async (req, res) => {
    const { newArr, column } = req.body;
    const { userId } = req.userData;

    //REMOVED HARD CODE & USING JWT NOW

    const query = await pool.query(
      `UPDATE columns 
      SET job_pos = $1
      WHERE column_id = $2 AND linked_user_id=$3
      RETURNING *`,
      [newArr, column, userId]
    );
    
    res.send(query.rows[0]);

  })

  .post('/createnewapp', ensureJwtAuth, async (req, res, next) => {
    const { position, company, jobUrl } = req.body;
    const { userId } = req.userData;

    //REMOVED HARD CODE & USING JWT NOW
    
    const query = await pool.query(
      `INSERT INTO job_apps (position, company, job_url, linked_user_id) 
      VALUES 
      ($1, $2, $3, $4)
      RETURNING *;`,
      [position, company, jobUrl, userId]
      
    );
      
    res.send(query.rows[0]);
      
  })

  .put('/updateapp', ensureJwtAuth, async (req, res, next) => {
    const { appId, position, company, jobUrl } = req.body;
    const { userId } = req.userData;

    //REMOVED HARD CODE & USING JWT NOW
    
    const query = await pool.query(
      `UPDATE job_apps 
        SET
          position=$1, 
          company=$2, 
          job_url=$3
      WHERE app_id=$4 AND linked_user_id=$5
      RETURNING *;`,
      [position, company, jobUrl, appId, userId]
      
    );
      
    res.send(query.rows[0]);
      
  })

  .delete('/deleteapp/:id', ensureJwtAuth, async (req, res, next) => {
    const { id } = req.params;
    const { userId } = req.userData;

    //REMOVED HARD CODE & USING JWT NOW

    const query = await pool.query(
      `DELETE FROM job_apps  
      WHERE app_id=$1 AND linked_user_id=$2
      RETURNING *;`,
      [id, userId]
    );
    res.send(query.rows[0]);
      
  });
