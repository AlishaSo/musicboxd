const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema(
  {
    name: { type: String, required: [true, 'Please add a name'] },
    username: { type: String, required: [true, 'Please add a username'], unique: true },
    email: { type: String, required: [true, 'Please add an email'], unique: true },
    password: { type: String, required: [true, 'Please add a password'] }
  },
  { timestamps: true }
)

module.exports = mongoose.model('users', User);