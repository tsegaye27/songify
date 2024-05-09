const express = require("express");
const router = express.Router();
const songsController = require("../controllers/songsController");

router.get("/", songsController.getAllSongs);

router.get("/:id", songsController.getSong);

router.post("/", songsController.addSong);

router.patch("/:id", songsController.updateSong);

router.delete("/:id", songsController.deleteSong);

module.exports = router;
