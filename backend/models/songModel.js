const mongoose = require('mongoose');
const { Schema } = mongoose;

const Song = new Schema(
  {
    title: { 
      type: String, 
      required: true 
    },
    artist: { 
      type: Schema.Types.ObjectId, 
      ref: 'artists' 
    },
    duration: { 
      type: String
    }
    /* album: { 
      type: Schema.Types.ObjectId, 
      ref: 'albums' 
    } */
    /* album: { 
      type: String, 
      required: true 
    } */
  },
  { timestamps: true }
);

module.exports = mongoose.model('songs', Song);