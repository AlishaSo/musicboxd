const mongoose = require('mongoose');
const { Schema } = mongoose;

const Review = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users'
    },
    album: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'albums'
    },
    dateListened: {
      type: Date
    },
    review: {
      type: String,
      required: true
    },
    rating: {
      type: Number
    },
    like: {
      type: Boolean
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('reviews', Review);