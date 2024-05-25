// Import both models
import CarListing from "../Models/Car-listModel.js";
import HouseListing from "../Models/House-listModel.js";

// Combined search functionality for both house and car listings
export const combineListController = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    // Common parameters for both house and car listings
    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sell", "rent"] };
    }

    // Additional parameters specific to house listings
    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    // Additional parameters specific to car listings
    let condition = req.query.condition;
    if (condition === undefined || condition === "all") {
      condition = { $in: ["NEW", "USED"] };
    }

    let transmission = req.query.transmission;
    if (transmission === undefined || transmission === "all") {
      transmission = { $in: ["Automatic", "Manual"] };
    }

    let fuelType = req.query.fuelType;
    if (fuelType === undefined || fuelType === "all") {
      fuelType = { $in: ["Petrol", "Diesel", "Electric"] };
    }

    // Search for both house and car listings
    const houseListings = await HouseListing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    // const yearRegex = new RegExp(searchTerm, "i");
    // const yearQuery = !isNaN(searchTerm) ? searchTerm : { $regex: yearRegex };

    const carListings = await CarListing.find({
      $or: [
        { model: { $regex: searchTerm, $options: "i" } },
        { address: { $regex: searchTerm, $options: "i" } },
        { color: { $regex: searchTerm, $options: "i" } },
        // { year: yearQuery },
      ],
      condition,
      transmission,
      fuelType,
      offer,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    // Combine and return both types of listings
    const combinedListings = [...carListings, ...houseListings];

    return res.status(200).json(combinedListings);
  } catch (error) {
    next(error);
  }
};
