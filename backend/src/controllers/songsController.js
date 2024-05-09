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

exports.getSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: song,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
