import jwt from "jsonwebtoken";
const JWT_SECRETE = "aryan11kokare";
import User from "./models/user.js";

export const authMiddelware = async (req, res, next) => {
  const token = req.header("token");
  if (!token) return res.status(401).json({ message: "Access Denied" });
  try {
    const verified = jwt.verify(token, JWT_SECRETE);
    const foundUser = await User.findById(verified.id);
    if (!foundUser) {
      return res.status(400).json({ message: "User not found" });
    }
    req.user = foundUser;
    next();
  } catch (e) {
    res.status(400).json(e);
  }
};
