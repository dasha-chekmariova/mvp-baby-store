import express from "express";
import {
  getHomeRecommendations,
  getFallbackRecommendations,
} from "../controllers/recommendations.controller.js";

const router = express.Router();

router.get("/home", getHomeRecommendations);
router.get("/fallback", getFallbackRecommendations);

export default router;
