const  pool  = require('../utils/pool');

module.exports = class User {
  userID;
  userEmail;
  userPassword;

  constructor(rows){

  }

  static async findUserByUsername(username) {
    const {
      rows
    } = await pool.query(
      `SELECT * FROM users WHERE username=$1`, 
      [username]
    );

    if(rows.length === 0) return null;
    
    return rows[0];
  }

  static async createUser(username, email, password) {
    const {
      rows
    } = await pool.query(
      `INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *`, 
      [username, email, password]
    );

    return rows[0];
  }




};

