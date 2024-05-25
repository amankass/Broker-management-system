import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
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
    },
    amount: {
      type: Number,
      required: true,
      default: 1000,
    },
  },
  { timestamps: true }
);

// Export the model
const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
