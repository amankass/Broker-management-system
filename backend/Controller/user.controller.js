import bcryptjs from "bcryptjs";
import User from "../Models/user-medel.js";
import asyncHandler from "express-async-handler";
import generateRefreshToken from "../utils/refreshtoken.js";
import generateToken from "../utils/token.js";
import { errorHandler } from "../utils/error.js";
export const test = (req, res) => {
  res.json({
    message: "Api route is Woking",
  });
};

export const updateUser = async (req, res, next) => {
  try {
    // Hash the password if provided
    if (req.body.password) {
      const hashedPassword = await bcryptjs.hash(req.body.password, 10);
      req.body.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(errorHandler(404, "user not found!"));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Admin login
export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findAdmin = await User.findOne({ email });

  if (findAdmin.role !== "admin") {
    throw new Error("Not authorized");
  }

  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    res.json({
      _id: findAdmin?._id,
      fname: findAdmin?.fname,
      lname: findAdmin?.lname,
      email: findAdmin?.email,
      username: findAdmin?.username,
      mobile: findAdmin?.mobile,
      password: findAdmin?.password,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};
export const deleteUserById = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});
