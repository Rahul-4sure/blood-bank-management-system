import express from "express";
import { getDonorCamps, getDonorHistory, getDonorProfile, getDonorStats, updateDonorProfile, bookCampSlot, cancelCampBooking } from "../controllers/donorController.js";
import { protectDonor } from "../middlewares/donorMiddleware.js";


const router = express.Router();

router.get("/profile", protectDonor, getDonorProfile)

router.put("/profile", protectDonor, updateDonorProfile);

router.get("/camps", protectDonor, getDonorCamps);

router.get("/history", protectDonor, getDonorHistory);

router.get("/stats", protectDonor, getDonorStats);

// Camp booking routes
router.post("/camps/:id/book", protectDonor, bookCampSlot);
router.delete("/camps/:id/cancel", protectDonor, cancelCampBooking);



export default router;
