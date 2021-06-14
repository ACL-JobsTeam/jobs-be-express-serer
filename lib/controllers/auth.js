/* eslint-disable keyword-spacing */
const { Router } = require('express');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { ensureJwtAuth } = require('../middleware/check-auth');

module.exports = Router()
  .post('/register', async (req, res, next) => {
    const { username, email, password } = req.body;

    // Hash & salt password (12 rounds)
    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      // Check if a User already exists
      const getUser = await User.findUserByUsername(username);
      const getUserEmail = await User.findUserByEmail(email);
<<<<<<< HEAD
      if(getUser){
        res.status(409).send({ status: 'failed', details: 'username already in use' });
      }
      if(getUserEmail){
        res.status(409).send({ status: 'failed', details: 'email already in use' });
=======
      if (getUser) {
        res
          .status(409)
          .send({ status: 'failed', details: 'username already in use' });
>>>>>>> fa8ad20bda20095a89b80ae3b042e05d2c24e1ee
      }
      if (getUserEmail) {
        res
          .status(409)
          .send({ status: 'failed', details: 'email already in use' });
      }

      // Create new User
<<<<<<< HEAD
      if(!getUser && !getUserEmail){
=======
      if (!getUser && !getUserEmail) {
>>>>>>> fa8ad20bda20095a89b80ae3b042e05d2c24e1ee
        const newUser = await User.createUser(username, email, hashedPassword);
        const { userId, userName, userEmail } = newUser;

        // Only send non-sensitive user data
<<<<<<< HEAD
        res.status(201).send({ response: 'success', details: 'created user', user: { userId, userName, userEmail } });
      }
    } catch(error) {
=======
        res
          .status(201)
          .send({
            response: 'success',
            details: 'created user',
            user: { userId, userName, userEmail },
          });
      }
    } catch (error) {
>>>>>>> fa8ad20bda20095a89b80ae3b042e05d2c24e1ee
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
    const getUser = await User.findUserByUsername(username);
    if (!getUser) {
      res
        .status(401)
        .send({ status: 'failed', details: 'username not found/incorrect' });
    }

<<<<<<< HEAD
    if(getUser) {
=======
    if (getUser) {
>>>>>>> fa8ad20bda20095a89b80ae3b042e05d2c24e1ee
      const { userId, userName, hashedUserPassword } = getUser;
      const valid = await bcrypt.compare(password, hashedUserPassword);

      // If User is valid, and passwords are correct, sign JWT and attach to cookie.
<<<<<<< HEAD
      if(valid){
        const signToken = async (userId, userName) => {
          return jwt.sign( 
            {
              userId,
              userName,
            }, 
            process.env.EXPRESS_SECRET_TOKEN, 
            { expiresIn: 60 * 60 * 24 },
          );
        };
        
        res.cookie('acl_jobs', await signToken(userId, userName), 
          {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: 'lax',
          });

        // Send reponse with cookie and message.
        res.status(200).send({ status: 'success', details: 'JWT set', user: { userId, userName } });
      }

      // If passwords don't match
      if(!valid) {
        res.status(401).send({ status: 'failed', details: 'password incorrect' });
=======
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
          sameSite: 'lax',
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
>>>>>>> fa8ad20bda20095a89b80ae3b042e05d2c24e1ee
      }
    }
  })

  .post('/getuser', ensureJwtAuth, async (req, res, next) => {
    // Route used to initially decode JWT and send back to FE if it's valid. (note middleware)
    const decodedJwt = jwt.decode(req.cookies.acl_jobs);

    res
      .status(200)
      .send({ status: 'success', details: 'JWT Validated', user: decodedJwt });
  });
