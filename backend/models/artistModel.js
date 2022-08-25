const mongoose = require('mongoose');
const { Schema } = mongoose;

const Artist = new Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    featuring: { 
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('artists', Artist);