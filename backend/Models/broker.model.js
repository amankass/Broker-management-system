import mongoose from "mongoose";

//const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
      index: true,
    },
    lname: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    imageUrls: {
      type: Array,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=",
    },
    role: {
      type: String,
      default: "broker",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    expirationDate: {
      type: Date,
      default: () => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1); // Set expiration date to one month from now
        return date;
      },
    },
  },
  { timestamps: true }
);

//Export the model
const Broker = mongoose.model("Broker", userSchema);

export default Broker;
