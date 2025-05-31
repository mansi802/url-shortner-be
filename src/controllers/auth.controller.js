import { loginUser, registerUser } from "../services/auth.service.js";
import { cookieOptions } from "../config/config.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const { token, newUser } = await registerUser(name, email, password);
    req.user = newUser;
    res.cookie("accessToken", token, cookieOptions);
    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);
    req.user = user;
    res.cookie("accessToken", token, cookieOptions);
    res.status(200).json({ user, message: "User logged in successfully" });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken", cookieOptions);
    res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error logging out" });
  }
};
