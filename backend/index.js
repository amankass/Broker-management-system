import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routes/user.route.js";
import authRouter from "./Routes/auth.route.js";
import brokerRouter from "./Routes/broker.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ProductRoute from "./Routes/Product-route.js";
import carlistRouter from "./Routes/Car-ListRoute.js";
import houselistRouter from "./Routes/House-ListRoute.js";
import combineListRoute from "./Routes/combineListRoute.js";
import blogroute from "./Routes/blogroute.js";
import blogcatroute from "./Routes/blogcatroute.js";
import PaymentRoute from "./Routes/PaymentRout.js";
import cors from "cors";
import http from "http";
import { init } from "./socket.js"; // Import the init function from your socket.js file

dotenv.config();

mongoose
  .connect("mongodb://127.0.0.1:27017/IBS-FullDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/broker", brokerRouter);
app.use("/api/product", ProductRoute);
app.use("/api/houeslist", houselistRouter);
app.use("/api/carlist", carlistRouter);
app.use("/api/combinelist", combineListRoute);
app.use("/api/blog", blogroute);
app.use("/api/blogcategory", blogcatroute);
app.use("/api/payment", PaymentRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const server = http.createServer(app);
const io = init(server); // Initialize socket.io

// Other server setup code...

//server.listen(3000);

// app.post("/forgot-password", (req, res) => {
//   const { email } = req.body;
//   User.findOne({ email: email }).then((user) => {
//     if (!user) {
//       return res.send({ Status: "User not existed" });
//     }
//     const token = jwt.sign({ id: user._id }, "jwt_secret_key", {
//       expiresIn: "1d",
//     });
//     var transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "amanuelkassahun18@gmail.com",
//         pass: "ayaaba1221",
//       },
//     });

//     var mailOptions = {
//       from: "amanuelkassahun18@gmail.com",
//       to: "user email@gmail.com",
//       subject: "Reset Password Link",
//       text: `http://localhost:5174/reset_password/${user._id}/${token}`,
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         return res.send({ Status: "Success" });
//       }
//     });
//   });
// });
