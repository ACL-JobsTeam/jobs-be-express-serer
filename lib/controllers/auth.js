const { Router } = require('express');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');


module.exports = Router()

  .post('/register', async (req, res, next) => {
    const { username, email, password } = req.body;

    // Hash & salt password (12 rounds)
    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      const getUser = await User.findUserByUsername(username);
      if(getUser){
        res.status(409).send({ status: 'failed', details: 'username already in use' });
      }

      const newUser = await User.createUser(username, email, hashedPassword);
      res.status(201).send({ response: 'success', details: 'created user', user: newUser });

    } catch(error) {
      next(error);
    }


  });
