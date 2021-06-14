const pool = require('../utils/pool');

module.exports = class User {
  userId;
  userName;
  userEmail;
  hashedUserPassword;

  constructor(rows) {
    this.userId = rows.id;
    this.userName = rows.username;
    this.userEmail = rows.email;
    this.hashedUserPassword = rows.password;
  }

  static async findUserByUsername(username) {
    const { rows } = await pool.query('SELECT * FROM users WHERE username=$1', [
      username,
    ]);

    if(rows.length === 0) return null;
    return new User(rows[0]);
  }
  static async findUserByEmail(email) {
    const {
      rows
    } = await pool.query(
      'SELECT * FROM users WHERE email=$1', 
      [email]
    );


    if(rows.length === 0) return null;
    return new User(rows[0]);
  }
  
  static async createUser(username, email, password) {
    const { rows } = await pool.query(
      'INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *',
      [username, email, password]
    );

    return new User(rows[0]);
  }

  


};
