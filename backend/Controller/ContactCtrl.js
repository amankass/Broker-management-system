import Contact from "../Models/ContactModel.js";
import asyncHandler from "express-async-handler";
export const test = (req, res) => {
  res.json({
    message: "Api route is Woking",
  });
};

export const getallComment = asyncHandler(async (req, res) => {
  try {
    const getComment = await Contact.find();
    res.json(getComment);
  } catch (error) {
    throw new Error(error);
  }
});
export const deleteCommentById = async (req, res, next) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json({ message: "Comment has been deleted!" }); // Fixed response format
  } catch (error) {
    next(error);
  }
};

