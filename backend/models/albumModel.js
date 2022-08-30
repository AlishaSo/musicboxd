const mongoose = require('mongoose');
const { Schema } = mongoose;

const Album = new Schema(
  {
    title: { 
      type: String, 
      unique: true,
      required: true 
    },
    artist: { 
      type: String,
      required: true
    },
    albumCover: { 
      type: String,
      required: true
    },
    releaseDate: { 
      type: String, 
      required: true 
    },
    // songs: [
    //   { 
    //     type: Schema.Types.ObjectId, 
    //     ref: 'songs_id' 
    //   }
    // ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('albums', Album);