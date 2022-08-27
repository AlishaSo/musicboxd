const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      //get token from header
      token = req.headers.authorization.split(' ')[1];

      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //get user from the token
      req.user = await User.findById(decoded.id).select('-password');  //the select will make it so that it will not return the hashed password that's stored in the database

      next();  //call the 'next' piece of middleware

    } catch(e) {
      console.log(e);
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if(!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
})

module.exports = { protect };