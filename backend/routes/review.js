import { Router } from "express";
import { deleteReview, eventReview } from "../controllers/review.js";
import { authMiddelware } from "../middelware.js";
const router = Router();

router.post("/review", authMiddelware, eventReview);
router.delete("/review/", authMiddelware, deleteReview);

export default router;
