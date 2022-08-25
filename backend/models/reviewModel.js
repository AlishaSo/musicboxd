const mongoose = require('mongoose');
const { Schema } = mongoose;

const Review = new Schema(
  {
    dateListened: {
      type: Date
    },
    review: {
      type: String,
      required: true
    },
    rating: {
      type: Double
    },
    like: {
      type: Boolean
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('reviews', Review);