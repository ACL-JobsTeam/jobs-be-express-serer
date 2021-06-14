const { Router } = require('express');
const pool = require('../utils/pool');

module.exports = Router()
  
  .get('/getall', async (req, res, next) => {

    //REMOVE HARD CODE & decode JWT USERID
    const userId = '100';

    const query = await pool.query(
      `SELECT * 
      FROM columns
      WHERE linked_user_id=$1`,
      [userId]
    );

    res.send(query.rows);

  })
  
  .post('/create', async (req, res, next) => {
    const { newColName, colPos } = req.body;

    //REMOVE HARD CODE & decode JWT USERID
    const userId = '100';
    
    const query = await pool.query(
      `INSERT INTO columns (name, col_position, job_pos, linked_user_id) 
      VALUES 
      ($1, $2, '{}', $3)
      RETURNING *;`,
      [newColName, colPos, userId]
      
    );
      
    res.send(query.rows);
      
  })
    
  .delete('/delete', async (req, res, next) => {
    const { columnId } = req.body;
    const query = await pool.query(
      `DELETE FROM columns
          WHERE column_id=$1
      RETURNING *`,
      [columnId]
    );
    
    res.send(query.rows);
    
  })
  
  .put('/updatepositions', async (req, res) => {
    const { data } = req.body;
  
    data.forEach(async (col, index) => {
      const query = await pool.query(
        `UPDATE columns 
        SET col_position = $1
        WHERE column_id =$2
        RETURNING *`,
        [index, col]
      );
        
    });
      
  })

  .put('/rename', async (req, res) => {
    const { newName, colId } = req.body;

    const query = await pool.query(
      `UPDATE columns 
      SET name = $1
      WHERE column_id =$2
      RETURNING *`,
      [newName, colId]
    );

    res.send(query.rows[0]);
        
  });
