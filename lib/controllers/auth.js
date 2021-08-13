/* eslint-disable keyword-spacing */
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { ensureJwtAuth } = require('../middleware/check-auth');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/register', async (req, res, next) => {
    const { username, email, password } = req.body;

    // Hash & salt password (12 rounds)
    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      // Check if a User already exists
      const getUser = await User.findUserByUsername(username);
      const getUserEmail = await User.findUserByEmail(email);
      if (getUser) {
        res
          .status(409)
          .send({ status: 'failed', details: 'username already in use' });
      }
      if (getUserEmail) {
        res
          .status(409)
          .send({ status: 'failed', details: 'email already in use' });
      }

      // Create new User
      if (!getUser && !getUserEmail) {
        const newUser = await User.createUser(username, email, hashedPassword);
        const { userId, userName, userEmail } = newUser;

        //REMOVED HARD CODE & USING JWT NOW
        
        const query = await pool.query(
          `INSERT INTO columns (name, col_position, is_archive, job_pos, linked_user_id) 
          VALUES 
          ($1, $2, $3, '{}', $4)
          RETURNING *;`,
          ['Storage', 0, true, userId]
        );
          


        // Only send non-sensitive user data
        res
          .status(201)
          .send({
            response: 'success',
            details: 'created user',
            user: { userId, userName, userEmail },
          });
      }
    } catch (error) {
      next(error);
    }
  })

  .post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    // If username/password are missing from body or username not in DB.
    if (!username || !password)
      res
        .status(400)
        .send({ status: 'failed', details: 'username/pw missing' });
    if(username && password){
      const getUser = await User.findUserByUsername(username);
      if (!getUser) {
        res
          .status(401)
          .send({ status: 'failed', details: 'username not found/incorrect' });
      }

      if (getUser) {
        const { userId, userName, hashedUserPassword } = getUser;
        const valid = await bcrypt.compare(password, hashedUserPassword);

        // If User is valid, and passwords are correct, sign JWT and attach to cookie.
        if (valid) {
          const signToken = async (userId, userName) => {
            return jwt.sign(
              {
                userId,
                userName,
              },
              process.env.EXPRESS_SECRET_TOKEN,
              { expiresIn: 60 * 60 * 24 }
            );
          };

          res.cookie('acl_jobs', await signToken(userId, userName), {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: 'none',
            secure: true
          });

          // Send reponse with cookie and message.
          res
            .status(200)
            .send({
              status: 'success',
              details: 'JWT set',
              user: { userId, userName },
            });
        }

        // If passwords don't match
        if (!valid) {
          res
            .status(401)
            .send({ status: 'failed', details: 'password incorrect' });
        }
      }
    }
  })

  .post('/getuser', ensureJwtAuth, async (req, res, next) => {
    // Route used to initially decode JWT and send back to FE if it's valid. (note middleware)
    const decodedJwt = jwt.decode(req.cookies.acl_jobs);

    res
      .status(200)
      .send({ status: 'success', details: 'JWT Validated', user: decodedJwt });
  })

  .post('/logout', ensureJwtAuth, (req, res) => {
    res.clearCookie('acl_jobs', { 
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: 'lax', 
    });
    res.status(200).send({ details: 'cleared cookie' });
  });
