import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
} from "../controllers/event.js";
import { authMiddelware } from "../middelware.js";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage: storage });

router.get("/events", authMiddelware, getAllEvents);
router.post("/event", authMiddelware, upload.single("media"), createEvent);
router.get("/event/:id", authMiddelware, getEventById);
router.delete("/event/:id", authMiddelware, deleteEvent);

export default router;
