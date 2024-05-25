import Broker from "../Models/broker.model.js";
import User from "../Models/user-medel.js";
//import Admin from "../Models/Admin.model.js";
// Middleware to check role-based protection
const roleBasedProtection = async (req, res, next) => {
  try {
    // Check if the email exists in the Broker collection
    const broker = await Broker.findOne({ email: req.body.email });
    if (broker) {
      req.userRole = "broker";
      req.userId = broker._id; // Include the _id from MongoDB
      req.status = broker.status;
      return next(); // Proceed to login
    }

    // Check if the email exists in the User collection
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      req.userRole = "user";
      req.userId = user._id; // Include the _id from MongoDB
      return next(); // Proceed to login
    }

    // If neither user nor broker found, return unauthorized
    return res.status(401).json({ message: "Unauthorized" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default roleBasedProtection;
