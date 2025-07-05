import express, { Router } from "express";
import { getStatistics } from "../controllers/statisticsController";
import { authenticateJwt } from "../middlewares/passport/authenticateJwt";

const router: Router = express.Router();

router.get("/", authenticateJwt, getStatistics);

export default router;
