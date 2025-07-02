import express, { Router } from "express";
import {
  createSong,
  deleteSong,
  getAllSongs,
  getSongById,
  searchSongs,
  updateSong,
} from "@/controllers/songController";
import {
  canCreateSong,
  canDeleteSong,
  canReadSongs,
  canUpdateSong,
} from "@/middlewares/checkPermissions";
import {
  validateCreateSong,
  validateUpdateSong,
} from "@/validators/validateSongs";
import { authenticateJwt } from "@/middlewares/passport/authenticateJwt";

const router: Router = express.Router();

router.get("/search", authenticateJwt, searchSongs);
router.get("/", authenticateJwt, canReadSongs, getAllSongs);
router.get("/:id", authenticateJwt, canReadSongs, getSongById);

router.post(
  "/",
  authenticateJwt,
  canCreateSong,
  validateCreateSong,
  createSong,
);
router.patch(
  "/:id",
  authenticateJwt,
  canUpdateSong,
  validateUpdateSong,
  updateSong,
);
router.delete("/:id", authenticateJwt, canDeleteSong, deleteSong);

export default router;
