import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { errorHandler } from "../utils/error.js";

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if ([username, email, password].some((field) => field?.trim() === "")) {
    next(errorHandler(400, "All fields are required"));
  }
  const existUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existUser) {
    next(errorHandler(409, "User with email or username already exist"));
  }
  const user = await User.create({
    username,
    email,
    password,
  });
  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    next(errorHandler(500, "Something went wrong while registering the user"));
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User register successfully"));
};

const signin = async (req, res) => {};
const google = async (req, res) => {};

export { signup, signin, google };
