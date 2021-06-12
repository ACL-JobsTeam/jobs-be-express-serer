const { Router } = require('express');
const pool = require('../utils/pool');

module.exports = Router()
  
  .get('/getcolumns', async (req, res, next) => {

    const query = await pool.query(
      `SELECT * 
      FROM columns
      WHERE linked_user_id=100`
    );

    res.send(query.rows);

  })
  
  .post('/createcolumn', async (req, res, next) => {
    const newColName = 'stuff';
    const colPos = req.body.lastPos;
    const user = '100';
    
    const query = await pool.query(
      `INSERT INTO columns (name, col_position, job_pos, linked_user_id) 
      VALUES 
      ($1, $2, '{}', $3)
      RETURNING *;`,
      [newColName, colPos, user]
      
    );
      
    res.send(query.rows);
      
  })
    
  .delete('/deletecolumn', async (req, res, next) => {
    const { columnId } = req.body;
    const query = await pool.query(
      `DELETE FROM columns
          WHERE column_id=$1
      RETURNING *`,
      [columnId]
    );
    
    res.send(query.rows);
    
  })
  
  .put('/updatecolumnpositions', async (req, res) => {
    const { data } = req.body;
    
    console.log('called');
    
    data.forEach(async (col, index) => {
      const query = await pool.query(
        `UPDATE columns 
        SET col_position = $1
        WHERE column_id =$2
        RETURNING *`,
        [index, col]
      );
        
    });
      
  });