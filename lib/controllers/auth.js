const { Router } = require('express');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports = Router()
  .get('/', (req, res, next) => {
    res.send('authroutes');
  });
