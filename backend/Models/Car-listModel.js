import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      enum: ["NEW", "USED"],
      required: true,
    },
    transmission: {
      type: String,
      enum: ["Automatic", "Manual"],
    },
    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric"],
    },
    type: {
      type: String,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    engineCapacity: {
      type: Number,
      required: true,
    },
    // driveType: {
    //   type: String,
    //   enum: ["AWD", "FWD", "RWD"],
    // },
    color: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CarListing = mongoose.model("CarListing", carSchema);

export default CarListing;
