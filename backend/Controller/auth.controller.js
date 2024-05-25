import Contact from "../Models/ContactModel.js";
import Broker from "../Models/broker.model.js";
import asyncHandler from "express-async-handler";
import User from "../Models/user-medel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getIO } from "../socket.js";
import nodemailer from "nodemailer";
import Payment from "../Models/PaymentModel.js";
//Authentication Controller for User SignUp
export const UserSignUp = async (req, res, next) => {
  const { fname, lname, username, email, password, mobile } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    fname,
    lname,
    username,
    email,
    password: hashedPassword,
    mobile,
  });
  try {
    await newUser.save();

    // Emit a socket.io event to notify the admin dashboard about the new user
    getIO().emit("newUserRegistered", newUser);

    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};
//==================================
// export const SignUp = async (req, res) => {
//   const email = req.body.email;
//   const findUser = await Broker.findOne({ email: email });

//   if (!findUser) {
//     // Create a new user
//     const newBroker = await Broker.create(req.body);
//     res.json(newBroker);
//   } else {
//     // User already exists
//     throw new Error("User Already Exists");
//   }
// };

export const SignUp = async (req, res, next) => {
  const {
    fname,
    lname,
    username,
    email,
    password,
    mobile,
    // experiance,
    // TypeofBroker,
    imageUrls,
  } = req.body;

  try {
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newBroker = new Broker({
      fname,
      lname,
      username,
      email,
      password: hashedPassword,
      mobile,
      // experiance,
      // TypeofBroker,
      imageUrls,
    });

    await newBroker.save();
    res.status(201).json("Broker created successfully");
  } catch (error) {
    // Pass the error to the next middleware function
    next(error);
  }
};

// Define a simple error handler function
const errorHandler = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export const forgotpassword = async (req, res) => {
  const { email } = req.body;

  // Check if email is missing
  if (!email) {
    return res.status(400).send({ error: "Email is required" });
  }

  try {
    let user = await User.findOne({ email });

    // If user not found in User model, search in Broker model
    if (!user) {
      user = await Broker.findOne({ email });
      if (!user) {
        return res.send({ Status: "User not existed" });
      }
    }

    const token = jwt.sign({ id: user._id }, "jwt_secret_key", {
      expiresIn: "1d",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "amanuelkassahun18@gmail.com",
        pass: "bosy ltlg idqv fojc",
      },
    });

    const mailOptions = {
      from: "amanuelkassahun18@gmail.com",
      to: email,
      subject: "Reset Password Link",
      text: `http://localhost:5173/reset_password/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).send({ Status: "Error sending email" });
      } else {
        return res.send({ Status: "Success" });
      }
    });
  } catch (error) {
    console.log("Database error:", error);
    return res.status(500).send({ Status: "Database error" });
  }
};

//=======RESET Password=========
export const resetepassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  jwt.verify(token, "jwt_secret_key", async (err, decoded) => {
    if (err) {
      return res.json({ Status: "Error with token" });
    } else {
      try {
        const hash = await bcryptjs.hash(password, 10);

        // First, try to find and update in the User collection
        const user = await User.findByIdAndUpdate(id, { password: hash });
        if (user) {
          return res.send({ Status: "Success" });
        }

        // If no User was found, try to find and update in the Broker collection
        const broker = await Broker.findByIdAndUpdate(id, { password: hash });
        if (broker) {
          return res.send({ Status: "Success" });
        }

        // If neither User nor Broker was found
        return res.send({ Status: "User or Broker not found" });
      } catch (error) {
        return res.send({ Status: error.message });
      }
    }
  });
};

//======RESETE PASSWORD=========

export const SignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email exists in the Broker model
    const existingBroker = await Broker.findOne({ email });

    // Check if the email exists in the User model
    const existingUser = await User.findOne({ email });

    // If neither broker nor user with the provided email is found, return an error
    if (!existingBroker && !existingUser) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Check if the password matches for the broker
    if (
      existingBroker &&
      !(await bcryptjs.compare(password, existingBroker.password))
    ) {
      return res.status(401).json({ message: "Incorrect password for broker" });
    }

    // Check if the password matches for the user
    if (
      existingUser &&
      !(await bcryptjs.compare(password, existingUser.password))
    ) {
      return res.status(401).json({ message: "Incorrect password for user" });
    }

    // Determine the role and id based on whether the email is found in Broker or User model
    const role = existingBroker ? existingBroker.role : existingUser.role;
    const id = existingBroker ? existingBroker._id : existingUser._id;
    const status = existingBroker ? existingBroker.status : existingUser.status;

    // Generate JWT token based on role
    const token = jwt.sign({ role, id, status }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expiration time
    });

    // Send the token in the response
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};

export const ContactPage = async (req, res, next) => {
  const { fullname, email, mobile, comment } = req.body;
  const newComment = new Contact({
    fullname,
    email,
    mobile,
    comment,
  });
  try {
    await newComment.save();
    res.status(201).json({ message: "Contact successfully" }); // Wrap the message in an object
  } catch (error) {
    next(error);
  }
};

//==================================

// export const SignIn = async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     const validUser = await User.findOne({ email });
//     if (!validUser) return next(errorHandler(404, "User not found!"));
//     const validPassword = bcryptjs.compareSync(password, validUser.password);
//     if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
//     const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
//     const { password: pass, ...rest } = validUser._doc;
//     res
//       .cookie("access_token", token, { httpOnly: true })
//       .status(200)
//       .json(rest);

//     // Send the token in the response
//     res.json({ token });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
//Authentication Controller for User SignUp
export const SystemPayment = async (req, res, next) => {
  const { fname, lname, email, amount } = req.body;
  const newPayment = new Payment({
    fname,
    lname,
    email,
    amount,
  });
  try {
    await newPayment.save();

    // // Emit a socket.io event to notify the admin dashboard about the new user
    // getIO().emit("newUserRegistered", newUser);

    res.status(201).json("Your System Payment is done");
  } catch (error) {
    next(error);
  }
};
//==================================
