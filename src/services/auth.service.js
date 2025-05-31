import User from "../models/user.model.js";
import { ConflictError } from "../utils/errorHandler.js";
import { signToken } from "../utils/helper.js";

export const registerUser = async (name, email, password) => {
  const user = await User.findOne({
    email,
  });

  if (user) throw new ConflictError("User already exists");

  const newUser = await User.create({ name, email, password });
  await newUser.save();

  const token = signToken({ id: newUser._id });
  return { token, newUser };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({
    email,
  }).select("+password");

  //since we are not selecting password field in the user model, we need to explicitly select it here

  if (!user) throw new Error("Invalid email or password");

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) throw new Error("Invalid email or password");

  const token = signToken({ id: user._id });
  return { token, user };
};
