//import house from "../Models/Car-listModel.js";
import bcryptjs from "bcryptjs";
import HouseListing from "../Models/House-listModel.js";
import Broker from "../Models/broker.model.js";
import { errorHandler } from "../utils/error.js";
import CarListing from "../Models/Car-listModel.js";
import asyncHandler from "express-async-handler";

export const test = (req, res) => {
  res.json({
    message: "Hello Worhghghghghghgld",
  });
};

export const checkAndUpdateExpiration = async () => {
  const brokers = await Broker.find({ status: "Approved" });
  const currentDate = new Date();

  brokers.forEach(async (broker) => {
    if (broker.expirationDate <= currentDate) {
      // Expire account
      broker.status = "Pending";
      broker.expirationDate = null;
      await broker.save();
    }
  });
};

// Example: Run this function every day
setInterval(checkAndUpdateExpiration, 3 * 60 * 1000); // 24 hours

const makePayment = async (brokerId) => {
  const broker = await Broker.findById(brokerId);
  if (broker) {
    broker.expirationDate.setMonth(broker.expirationDate.getMonth() + 1); // Extend expiration by one month
    await broker.save();
  }
};

export const getUserListings = async (req, res, next) => {
  try {
    // Fetch house listings
    const houseListings = await HouseListing.find({ userRef: req.params.id });
    // Fetch car listings
    const carListings = await CarListing.find({ userRef: req.params.id });
    // Combine the listings from both models into a single array if needed
    const allListings = [...houseListings, ...carListings];
    res.status(200).json(allListings);
  } catch (error) {
    return next(error);
  }
};

export const updateBroker = async (req, res, next) => {
  try {
    // Hash the password if provided
    if (req.body.password) {
      const hashedPassword = await bcryptjs.hash(req.body.password, 10);
      req.body.password = hashedPassword;
    }

    const updateBroker = await Broker.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    const { password, ...rest } = updateBroker._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteBroker = async (req, res, next) => {
  try {
    // Find and delete the broker by ID
    await Broker.findByIdAndDelete(req.params.id);

    // Find and delete car listings associated with the broker
    await CarListing.deleteMany({ userRef: req.params.id });

    // Find and delete house listings associated with the broker
    await HouseListing.deleteMany({ userRef: req.params.id });

    // Clear the access token cookie
    res.clearCookie("access_token");

    // Send response
    res.status(200).json("User and associated listings have been deleted!");
  } catch (error) {
    next(error);
  }
};

export const deleteBrokerById = async (req, res, next) => {
  try {
    // Find and delete the broker by ID
    await Broker.findByIdAndDelete(req.params.id);

    // Find and delete car listings associated with the broker
    await CarListing.deleteMany({ userRef: req.params.id });

    // Find and delete house listings associated with the broker
    await HouseListing.deleteMany({ userRef: req.params.id });

    // Clear the access token cookie
    res.clearCookie("access_token");

    // Send response
    res.status(200).json("User and associated listings have been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateBrokerStatusById = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedBroker = await Broker.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedBroker) {
      return res.status(404).json({ error: "Broker not found" });
    }

    res.status(200).json(updatedBroker);
  } catch (error) {
    next(error);
  }
};

export const getBroker = async (req, res, next) => {
  try {
    const user = await Broker.findById(req.params.id);
    if (!user) {
      return next(errorHandler(404, "user not found!"));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await Broker.findById(req.params.id);

    if (!user) return next(errorHandler(404, "User not found!"));

    const { password: pass, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const getallBroker = asyncHandler(async (req, res) => {
  try {
    const getUsers = await Broker.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});
