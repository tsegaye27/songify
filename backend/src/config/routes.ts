import express, { Router } from "express";
import authRoutes from "../routes/authRoute";
import songRoutes from "../routes/songRoute";
import playlistRoutes from "../routes/playlistRoute";
import statisticsRoutes from "../routes/statisticsRoute";

const router: Router = express.Router();

router.use("/auth", authRoutes);
router.use("/songs", songRoutes);
router.use("/playlists", playlistRoutes);
router.use("/statistics", statisticsRoutes);

router.get("/health", (_req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is running successfully",
    timestamp: new Date().toISOString(),
  });
});

export default router;
