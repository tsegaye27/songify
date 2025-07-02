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
} from "@/controllers/playlistController";
import {
  canCreateOwnPlaylist,
  canDeleteOwnPlaylist,
  canReadAnyPlaylist,
  canReadOwnPlaylist,
  canUpdateOwnPlaylist,
} from "@/middlewares/checkPermissions";
import {
  validateAddSong,
  validateCreatePlaylist,
  validateUpdatePlaylist,
} from "@/validators/validatePlaylists";
import { authenticateJwt } from "@/middlewares/passport/authenticateJwt";

const router: Router = express.Router();

router.get("/search", authenticateJwt, searchPlaylists);
router.get("/public", authenticateJwt, canReadAnyPlaylist, getPublicPlaylists);

router.get("/my", authenticateJwt, canReadOwnPlaylist, getUserPlaylists);

router.get("/:id", authenticateJwt, getPlaylistById);
router.post(
  "/",
  authenticateJwt,
  canCreateOwnPlaylist,
  validateCreatePlaylist,
  createPlaylist,
);
router.patch(
  "/:id",
  authenticateJwt,
  canUpdateOwnPlaylist,
  validateUpdatePlaylist,
  updatePlaylist,
);
router.delete("/:id", authenticateJwt, canDeleteOwnPlaylist, deletePlaylist);

router.post(
  "/:id/songs",
  authenticateJwt,
  canUpdateOwnPlaylist,
  validateAddSong,
  addSongToPlaylist,
);
router.delete(
  "/:id/songs/:songId",
  authenticateJwt,
  canUpdateOwnPlaylist,
  removeSongFromPlaylist,
);

export default router;
