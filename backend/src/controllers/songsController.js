const Song = require("../models/Song");

exports.getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json({
      status: "success",
      results: songs.length,
      data: songs,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
