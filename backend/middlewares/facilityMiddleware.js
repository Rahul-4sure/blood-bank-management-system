import jwt from "jsonwebtoken";
import Facility from "../models/facilityModel.js";
import { getTokenFromRequest } from "../utils/authToken.js";

export const protectFacility = async (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const facility = await Facility.findById(decoded.id).select("-password");
    if (!facility) {
      return res.status(404).json({ message: "Facility not found" });
    }

    req.user = facility;
    next();
  } catch (error) {
    console.error("Facility Auth Error:", error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
