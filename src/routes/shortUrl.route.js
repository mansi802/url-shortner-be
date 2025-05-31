import express from "express";
const router = express.Router();
import {
  createShortUrl,
  redirectFromShortUrl,
  getUserInfo,
  getAllUrls,
} from "../controllers/shortUrl.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

router.get("/me", authMiddleware, getUserInfo);

router.get("/urls", authMiddleware, getAllUrls);

router.post("/create", createShortUrl);

router.get("/:id", redirectFromShortUrl);

export default router;
