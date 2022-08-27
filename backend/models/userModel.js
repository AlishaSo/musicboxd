const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema(
  {
    name: { type: String, required: [true, 'Please add a name'] },
    email: { type: String, required: [true, 'Please add an email'], unique: true },
    password: { type: String, required: [true, 'Please add a password'] }
  },
  { timestamps: true }
)

module.exports = mongoose.model('users', User);