import express, { Router } from "express";
import {
  addSongToPlaylist,
  createPlaylist,
  deletePlaylist,
  getPlaylistById,
  getPublicPlaylists,
  getUserPlaylists,
  removeSongFromPlaylist,
  searchPlaylists,
  updatePlaylist,
} from "../controllers/playlistController";
import {
  validateAddSong,
  validateCreatePlaylist,
  validateUpdatePlaylist,
} from "../validators/validatePlaylists";
import { authenticateJwt } from "../middlewares/passport/authenticateJwt";
import { checkPermission } from "@/middlewares/checkPermissions";

const router: Router = express.Router();

router.get("/search", authenticateJwt, searchPlaylists);
router.get(
  "/public",
  authenticateJwt,
  checkPermission("readAny", "playlist"),
  getPublicPlaylists,
);

router.get(
  "/my",
  authenticateJwt,
  checkPermission("readOwn", "playlist"),
  getUserPlaylists,
);

router.get("/:id", authenticateJwt, getPlaylistById);
router.post(
  "/",
  authenticateJwt,
  checkPermission("createOwn", "playlist"),
  validateCreatePlaylist,
  createPlaylist,
);
router.patch(
  "/:id",
  authenticateJwt,
  checkPermission("updateOwn", "playlist"),
  validateUpdatePlaylist,
  updatePlaylist,
);
router.delete(
  "/:id",
  authenticateJwt,
  checkPermission("deleteOwn", "playlist"),
  deletePlaylist,
);

router.post(
  "/:id/songs",
  authenticateJwt,
  checkPermission("updateOwn", "playlist"),
  validateAddSong,
  addSongToPlaylist,
);
router.delete(
  "/:id/songs/:songId",
  authenticateJwt,
  checkPermission("updateOwn", "playlist"),
  removeSongFromPlaylist,
);

export default router;
