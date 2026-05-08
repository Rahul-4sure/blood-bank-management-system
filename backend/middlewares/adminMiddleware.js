import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";
import { getTokenFromRequest } from "../utils/authToken.js";

export const protectAdmin = async (req, res, next) => {
  const token = getTokenFromRequest(req);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.role !== "admin") {
        return res.status(403).json({ message: "Not an admin" });
      }

      req.user = decoded;
      next();
    } catch (error) {
      console.error("Admin auth error:", error);
      return res.status(401).json({ message: "Token invalid or expired" });
    }
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};
