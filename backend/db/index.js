const mongoose = require('mongoose');

if(process.env.NODE_ENV != 'production')
  require('dotenv').config();

let MONGODB_URI = process.env.NODE_ENV == 'production' ? process.env.PROD_MONGODB : process.env.MONGODB_URI_LOCAL;

mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('Successfully connected to MongoDB'))
.catch(e => console.log('Error connecting to MongoDB', e.message));

const db = mongoose.connection;

module.exports = db;