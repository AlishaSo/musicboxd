const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const routes = require('./routes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(logger('dev'));

app.use('/api', routes);

app.use(errorHandler);

module.exports = app;