import { Router } from "express";
import { getUser, loginUser, signupUser } from "../controllers/user.js";
import { authMiddelware } from "../middelware.js";
const router = Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/user", authMiddelware, getUser);

export default router;
