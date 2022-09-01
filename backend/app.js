const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const routes = require('./routes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ 'Access-Control-Allow-Origin': '*' }));
// app.options('*', cors());
app.use(logger('dev'));

app.use('/api', routes);

// //Serve frontend
// if(process.env.NODE_ENV == 'production') {
//   app.use(express.static(path.join(__dirname, '../client/dist')));

//   app.get('*', (req, res) => 
//   res.sendFile(
//     path.resolve(__dirname, '../', 'client', 'dist', 'index.html')
//   ));
// }
// else {
//   app.get('/', (req, res) => res.send('Please set to production'));
// }

app.use(errorHandler);

module.exports = app;