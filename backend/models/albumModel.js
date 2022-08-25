const mongoose = require('mongoose');
const { Schema } = mongoose;

const Album = new Schema(
  {
    title: { 
      type: String, 
      required: true 
    },
    artist: { 
      type: Schema.Types.ObjectId, 
      ref: 'artist_id' 
    },
    albumCover: { 
      type: String 
    },
    releaseDate: { 
      type: String, 
      required: true 
    },
    duration: { 
      type: String, 
      required: true 
    },
    songs: [
      { 
        type: Schema.Types.ObjectId, 
        ref: 'songs_id' 
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('albums', Album);