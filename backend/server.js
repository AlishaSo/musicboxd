const app = require('./app');
const db = require('./db');

const PORT = process.env.PORT || 3500;

db.on('error', console.error.bind(console, 'MongoDB connection error: '));

app.listen(PORT, console.log(`Listening on ${PORT}`));