import express from "express";
import { getAllServices } from "../controllers/servController.js";
import { verifyToken } from "../middlewares/jwt.js";

const router = express.Router();

router.get("/services", verifyToken, getAllServices);

export default router;
