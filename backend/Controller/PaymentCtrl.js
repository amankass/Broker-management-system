import Payment from "../Models/PaymentModel.js";
import asyncHandler from "express-async-handler";

export const getPaymentList = asyncHandler(async (req, res) => {
  try {
    const getPayment = await Payment.find();
    res.json(getPayment);
  } catch (error) {
    throw new Error(error);
  }
});
export const deletePayment = async (req, res, next) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.status(200).json("Payment has been deleted!");
  } catch (error) {
    next(error);
  }
};
