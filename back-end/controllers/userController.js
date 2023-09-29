import User from "../models/User.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandle.js";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    //set token as cookie

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSire: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerUser = async (req, res) => {
  res.send("register");
};

const logOutUser = async (req, res) => {
  res.send("logout");
};

const getUserProfile = async (req, res) => {
  res.send("user profile");
};

const updateUserProfile = async (req, res) => {
  res.send("update user profile");
};

const getUsers = async (req, res) => {
  res.send("get users");
};

const getUserById = async (req, res) => {
  res.send("get user by id");
};

const updateUser = async (req, res) => {
  res.send("update user");
};

const deleteUser = async (req, res) => {
  res.send("delete user");
};

export {
  authUser,
  registerUser,
  logOutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
};
