import express, { Router } from "express";
import {
  createSong,
  deleteSong,
  getAllSongs,
  getSongById,
  searchSongs,
  updateSong,
  getDistinctAlbums,
  getDistinctGenres,
} from "../controllers/songController";
import {
  validateCreateSong,
  validateUpdateSong,
} from "../validators/validateSongs";
import { authenticateJwt } from "../middlewares/passport/authenticateJwt";
import { checkPermission } from "@/middlewares/checkPermissions";

const router: Router = express.Router();

router.get("/meta/genres", authenticateJwt, getDistinctGenres);
router.get("/meta/albums", authenticateJwt, getDistinctAlbums);

router.get("/search", authenticateJwt, searchSongs);
router.get(
  "/",
  authenticateJwt,
  checkPermission("readAny", "song"),
  getAllSongs,
);
router.get(
  "/:id",
  authenticateJwt,
  checkPermission("readAny", "song"),
  getSongById,
);

router.post(
  "/",
  authenticateJwt,
  checkPermission("createAny", "song"),
  validateCreateSong,
  createSong,
);
router.patch(
  "/:id",
  authenticateJwt,
  checkPermission("updateAny", "song"),
  validateUpdateSong,
  updateSong,
);
router.delete(
  "/:id",
  authenticateJwt,
  checkPermission("deleteAny", "song"),
  deleteSong,
);

export default router;
