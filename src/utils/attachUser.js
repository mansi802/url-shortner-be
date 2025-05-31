import User from "../models/user.model.js";
import { verifyToken } from "./helper.js";

export const attachUser = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) return next();

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded);
    if (!user) return next();
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    next();
  }
};
