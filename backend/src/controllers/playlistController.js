const Playlist = require("../models/Playlist");

const playlistController = {
  getAllPlaylists: async (req, res) => {
    try {
      const playlists = await Playlist.find().populate("songs");
      res.status(200).json(playlists);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getPlaylist: async (req, res) => {
    try {
      const playlist = await Playlist.findById(req.params.id).populate("songs");

      if (!playlist) {
        return res.status(404).json({ message: "Playlist not found" });
      }

      res.status(200).json(playlist);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  addPlaylist: async (req, res) => {
    const { name } = req.body;
    try {
      const newPlaylist = new Playlist({ name });
      await newPlaylist.save();
      res.status(201).json(newPlaylist);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  updatePlaylist: async (req, res) => {
    try {
      const { name, songs } = req.body;
      const updatedPlaylist = await Playlist.findByIdAndUpdate(
        req.params.id,
        { name, songs },
        { new: true, runValidators: true }
      );
      if (!updatedPlaylist) {
        return res.status(404).json({ message: "Playlist not found" });
      }
      res.status(200).json(updatedPlaylist);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  deletePlaylist: async (req, res) => {
    try {
      const deletedPlaylist = await Playlist.findByIdAndDelete(req.params.id);
      if (deletedPlaylist) {
        res.status(204).json(null);
      } else {
        res.status(404).json({ message: "Playlist not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  addSongToPlaylist: async (req, res) => {
    try {
      const playlist = await Playlist.findById(req.params.id);
      if (!playlist) {
        return res.status(404).json({ message: "Playlist not found" });
      }
      playlist.songs.push(req.body.songId);
      await playlist.save();
      res.status(200).json(playlist);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  removeSongFromPlaylist: async (req, res) => {
    try {
      const playlist = await Playlist.findById(req.params.id);
      if (!playlist) {
        return res.status(404).json({ message: "Playlist not found" });
      }
      playlist.songs.pull(req.body.songId);
      await playlist.save();
      res.status(200).json(playlist);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = playlistController;
