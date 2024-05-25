import mongoose from "mongoose";
//const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const ContactSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//Export the model

const Contact = mongoose.model("Contact", ContactSchema);

export default Contact;
