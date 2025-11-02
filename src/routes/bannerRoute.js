import express from "express";
import { getAllBanners } from "../controllers/bannerController.js";

const router = express.Router();

router.get("/banner", getAllBanners);

export default router;