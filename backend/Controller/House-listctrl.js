//import { errorHandler } from '../utils/error.js';

import HouseListing from "../Models/House-listModel.js";
import asyncHandler from "express-async-handler";
import cron from "node-cron";

export const createListing = async (req, res, next) => {
  try {
    // code, (30 * 24 * 60 * 60 * 1000) calculates the number of milliseconds in 30 days, 
    // which is then added to the current date (today.getTime()) to get the expiry date one month from now.
    const today = new Date();
    const expiryDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000); // Set expiry date to 30 days from now

    const listingData = {
      ...req.body,
      expiryDate: expiryDate,
    };

    const Hlisting = await HouseListing.create(listingData);
    return res.status(201).json(Hlisting);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    await HouseListing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const updatedListing = await HouseListing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await HouseListing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getHouseListings = asyncHandler(async (req, res) => {
  try {
    const getHouse = await HouseListing.find();
    res.json(getHouse);
  } catch (error) {
    throw new Error(error);
  }
});

// Schedule a job to run every day at midnight
export const autoDeleteListings = () => {
  cron.schedule("0 0 * * *", async () => {
    const expiredListings = await HouseListing.find({
      expiryDate: { $lt: new Date() }, // Find listings where expiryDate is less than current date
    });
    await HouseListing.deleteMany({
      _id: { $in: expiredListings.map((listing) => listing._id) },
    });
  });
};
//SEARCH FUNCTIONALITY
// export const getListings = async (req, res, next) => {
//   try {
//     const limit = parseInt(req.query.limit) || 9;
//     const startIndex = parseInt(req.query.startIndex) || 0;
//     let offer = req.query.offer;

//     if (offer === undefined || offer === "false") {
//       offer = { $in: [false, true] };
//     }

//     let furnished = req.query.furnished;

//     if (furnished === undefined || furnished === "false") {
//       furnished = { $in: [false, true] };
//     }

//     let parking = req.query.parking;

//     if (parking === undefined || parking === "false") {
//       parking = { $in: [false, true] };
//     }

//     let type = req.query.type;

//     if (type === undefined || type === "all") {
//       type = { $in: ["sale", "rent"] };
//     }

//     const searchTerm = req.query.searchTerm || "";

//     const sort = req.query.sort || "createdAt";

//     const order = req.query.order || "desc";

//     const listings = await HouseListing.find({
//       name: { $regex: searchTerm, $options: "i" },
//       offer,
//       furnished,
//       parking,
//       type,
//     })
//       .sort({ [sort]: order })
//       .limit(limit)
//       .skip(startIndex);

//     return res.status(200).json(listings);
//   } catch (error) {
//     next(error);
//   }
// };
