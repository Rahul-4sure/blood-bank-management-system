// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import Donor from "../models/donorModel.js";
import Admin from "../models/adminModel.js";
import Facility from "../models/facilityModel.js";
import { getTokenFromRequest } from "../utils/authToken.js";

export const protect = async (req, res, next) => {
  const token = getTokenFromRequest(req);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let user =
        (await Donor.findById(decoded.id).select("-password")) ||
        (await Admin.findById(decoded.id).select("-password")) ||
        (await Facility.findById(decoded.id).select("-password"));

      if (!user)
        return res.status(401).json({ message: "User not found or unauthorized" });

      req.user = { id: user._id, _id: user._id, role: decoded.role };
      req.token = token;
      next();
    } catch (error) {
      console.error("Auth middleware error:", error);
      return res.status(401).json({ message: "Token invalid or expired" });
    }
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};
