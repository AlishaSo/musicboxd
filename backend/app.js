const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const routes = require('./routes');
const dotenv = require('dotenv');
const db = require('./db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(logger('dev'));

app.use('/api', routes);

module.exports = app;