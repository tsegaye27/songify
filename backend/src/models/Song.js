const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    // minLength: 1,
    // maxLength: 25,
  },
  artist: {
    type: String,
    required: true,
    // minLength: 1,
    // maxLength: 25,
  },
  // genre: {
  //   type: String,
  //   required: true,
  //   minLength: 1,
  //   maxLength: 25,
  // },
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
