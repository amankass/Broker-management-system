//import Listing from '../models/listing.model.js';
//import { errorHandler } from '../utils/error.js';
import CarListing from "../Models/Car-listModel.js";
import asyncHandler from "express-async-handler";

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

    const Hlisting = await CarListing.create(listingData);
    return res.status(201).json(Hlisting);
  } catch (error) {
    next(error);
  }
  // try {
  //   const Clisting = await CarListing.create(req.body);
  //   return res.status(200).json(Clisting);
  // } catch (error) {
  //   next(error);
  // }
};

export const deleteListings = async (req, res, next) => {
  try {
    await CarListing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};
export const updateListings = async (req, res, next) => {
  try {
    const updatedListing = await CarListing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};
export const getListings = async (req, res, next) => {
  try {
    const listing = await CarListing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
export const getCarListings = asyncHandler(async (req, res) => {
  try {
    const getCar = await CarListing.find();
    res.json(getCar);
  } catch (error) {
    throw new Error(error);
  }
});

// Schedule a job to run every day at midnight
export const CarautoDeleteListings = () => {
  cron.schedule("0 0 * * *", async () => {
    const expiredListings = await CarListing.find({
      expiryDate: { $lt: new Date() }, // Find listings where expiryDate is less than current date
    });
    await CarListing.deleteMany({
      _id: { $in: expiredListings.map((listing) => listing._id) },
    });
  });
};
// //SEARCH FUNCTIONALITY
// export const getCarListings = async (req, res, next) => {
//   try {
//     const limit = parseInt(req.query.limit) || 9;
//     const startIndex = parseInt(req.query.startIndex) || 0;

//     let condition = req.query.condition;
//     if (condition === undefined || condition === "all") {
//       condition = { $in: ["NEW", "USED"] };
//     }

//     let transmission = req.query.transmission;
//     if (transmission === undefined || transmission === "all") {
//       transmission = { $in: ["Automatic", "Manual"] };
//     }

//     let fuelType = req.query.fuelType;
//     if (fuelType === undefined || fuelType === "all") {
//       // Modify as needed based on available fuel types
//       fuelType = { $in: ["Petrol", "Diesel", "Electric"] };
//     }

//     let offer = req.query.offer;
//     if (offer === undefined || offer === "false") {
//       offer = { $in: [false, true] };
//     }

//     let type = req.query.type;

//     if (type === undefined || type === "all") {
//       type = { $in: ["sale", "rent"] };
//     }

//     const searchTerm = req.query.searchTerm || "";

//     const sort = req.query.sort || "createdAt";
//     const order = req.query.order || "desc";

//     const listings = await CarListing.find({
//       $or: [
//         { model: { $regex: searchTerm, $options: "i" } },
//         { year: { $regex: searchTerm, $options: "i" } },
//         { address: { $regex: searchTerm, $options: "i" } },
//         { color: { $regex: searchTerm, $options: "i" } },
//       ],
//       condition,
//       transmission,
//       fuelType,
//       offer,
//     })
//       .sort({ [sort]: order })
//       .limit(limit)
//       .skip(startIndex);

//     return res.status(200).json(listings);
//   } catch (error) {
//     next(error);
//   }
// };
