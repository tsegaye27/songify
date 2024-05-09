const Song = require("../models/Song");

exports.getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.status(200).json({
      status: "success",
      data: song,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addSong = async (req, res) => {
  const { title, artist } = req.body;
  try {
    const newSong = await Song.create({ title, artist });
    res.status(201).json({
      status: "success",
      data: newSong,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.status(200).json({
      status: "success",
      data: song,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSong = async (req, res) => {
  try {
    const deletedSong = await Song.findByIdAndDelete(req.params.id);
    if (deletedSong) {
      res.status(204).json({
        message: "Song Deleted",
      });
    } else {
      res.status(404).json({ message: "Song not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
