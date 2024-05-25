const express = require("express");
const router = express.Router();
const playlistsController = require("../controllers/playlistsController");

router.get("/", playlistsController.getAllPlaylists);

router.get("/:id", playlistsController.getPlaylist);

router.post("/", playlistsController.addPlaylist);

router.patch("/:id", playlistsController.updatePlaylist);

router.delete("/:id", playlistsController.deletePlaylist);

router.post("/:id/songs", playlistsController.addSongToPlaylist);

router.delete("/:id/songs/:songId", playlistsController.removeSongFromPlaylist);

module.exports = router;
