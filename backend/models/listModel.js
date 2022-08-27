const mongoose = require('mongoose');
const { Schema } = mongoose;

const List = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users'
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    // albums: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'reviews'
    // }
  },
  { timestamps: true }
);

module.exports = mongoose.model('lists', List);