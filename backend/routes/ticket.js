import { Router } from "express";
import {
  createTicket,
  downloadTicket,
  getAllTickets,
} from "../controllers/ticket.js";
import { authMiddelware } from "../middelware.js";
const router = Router();

router.post("/ticket", authMiddelware, createTicket);
router.get("/ticket/download_ticket", downloadTicket);
router.get("/tickets", authMiddelware, getAllTickets);

export default router;
