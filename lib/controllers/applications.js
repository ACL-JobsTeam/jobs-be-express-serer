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
  
  })

  .patch('/updatecolapplications', async (req, res) => {
    const { newArr, column } = req.body;
    
    const query = await pool.query(
      `UPDATE columns 
      SET job_pos = $1
      WHERE column_id = $2
      RETURNING *`,
      [newArr, column]
    );
    
    res.send(query.rows[0]);

  })

  .post('/createnewapp', async (req, res, next) => {
    const { position, company, jobUrl } = req.body;

    //REMOVE HARD CODE & decode JWT USERID
    const userId = '100';
    
    const query = await pool.query(
      `INSERT INTO job_apps (position, company, job_url, linked_user_id) 
      VALUES 
      ($1, $2, $3, $4)
      RETURNING *;`,
      [position, company, jobUrl, userId]
      
    );
      
    res.send(query.rows[0]);
      
  })

  .put('/updateapp', async (req, res, next) => {
    const { appId, position, company, jobUrl } = req.body;
    
    const query = await pool.query(
      `UPDATE job_apps 
        SET
          position=$1, 
          company=$2, 
          job_url=$3
      WHERE app_id=$4
      RETURNING *;`,
      [position, company, jobUrl, appId]
      
    );
      
    res.send(query.rows[0]);
      
  })

  .delete('/deleteapp/:id', async (req, res, next) => {
    const { id } = req.params;

    const query = await pool.query(
      `DELETE FROM job_apps  
      WHERE app_id=$1
      RETURNING *;`,
      [id]
    );
    res.send(query.rows[0]);
      
  });
