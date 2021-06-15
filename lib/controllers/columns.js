const { Router } = require('express');
const { ensureJwtAuth } = require('../middleware/check-auth');
const pool = require('../utils/pool');

module.exports = Router()
  
  .get('/getall', ensureJwtAuth, async (req, res, next) => {
    const { userId } = req.userData;

    //REMOVED HARD CODE & USING JWT NOW

    const query = await pool.query(
      `SELECT * 
      FROM columns
      WHERE linked_user_id=$1`,
      [userId]
    );

    res.send(query.rows);

  })
  
  .post('/create', ensureJwtAuth, async (req, res, next) => {
    const { newColName, colPos } = req.body;
    const { userId } = req.userData;

    //REMOVED HARD CODE & USING JWT NOW
    
    const query = await pool.query(
      `INSERT INTO columns (name, col_position, job_pos, linked_user_id) 
      VALUES 
      ($1, $2, '{}', $3)
      RETURNING *;`,
      [newColName, colPos, userId]
      
    );
      
    res.send(query.rows);
      
  })
    
  .delete('/delete', ensureJwtAuth, async (req, res, next) => {
    const { columnId } = req.body;
    const { userId } = req.userData;

    //REMOVED HARD CODE & USING JWT NOW

    const query = await pool.query(
      `DELETE FROM columns
          WHERE column_id=$1 AND linked_user_id=$2
      RETURNING *`,
      [columnId, userId]
    );
    
    res.send(query.rows);
    
  })
  
  .put('/updatepositions', ensureJwtAuth, async (req, res) => {
    const { data } = req.body;
    const { userId } = req.userData;

    //REMOVED HARD CODE & USING JWT NOW
    let updatedCols = 0;

    data.forEach(async (col, index) => {
      updatedCols += 1;
      const query = await pool.query(
        `UPDATE columns 
        SET col_position = $1
        WHERE column_id =$2 AND linked_user_id=$3
        RETURNING *`,
        [index, col, userId]
      );
    });

    res.send({ 'updated': updatedCols });
  })

  .put('/rename', ensureJwtAuth, async (req, res) => {
    const { newName, colId } = req.body;
    const { userId } = req.userData;

    //REMOVED HARD CODE & USING JWT NOW
  
    const query = await pool.query(
      `UPDATE columns 
      SET name = $1
      WHERE column_id =$2 AND linked_user_id=$3
      RETURNING *`,
      [newName, colId, userId]
    );

    res.send(query.rows[0]);   
  });
