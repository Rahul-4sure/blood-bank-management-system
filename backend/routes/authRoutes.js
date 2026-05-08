import express from "express";
import { register, login, getProfile, getSession } from "../controllers/authContoller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/session", protect, getSession);
// PROFILE (Protected Route)
router.get("/profile", protect, getProfile);

export default router;
