import mongoose from "mongoose"; // Erase if already required

// Declare the Schema of the Mongo model
const blogcategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
const BlBCategoryog = mongoose.model("BlBCategoryog", blogcategorySchema);

export default BlBCategoryog;
