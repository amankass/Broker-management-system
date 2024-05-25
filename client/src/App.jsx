import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
// import Hearder from './Component/Header';
import Store from "./Pages/Store";
import Blog from "./Pages/Blog";
import ContactPage from "./Pages/ContactPage";
import UserSignUp from "./Pages/UserSignUp";
import PrivateRoute from "./Component/PrivateRoute";
import Bprofile from "./Pages/Bprofile";
import BPrivateRoute from "./Component/BPrivateRoute";
import CarListingPage from "./Pages/CarListingPage";
import HouseListingPage from "./Pages/HouseListingPage";
import CreateListing from "./Pages/UpdateHouseListing";
import HouseListing from "./Pages/HouseListing";
import Search from "./Pages/Search";
import CarListing from "./Pages/CarListing";
import UpdateCarListing from "./Pages/UpdateCarListing";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Donet from "./Pages/Donet";
import CarListingonly from "./Pages/CarListingonly";
import Houselistingonly from "./Pages/Houselistingonly";
import Broker from "./Pages/Broker";
//import DarkMode from "./Component/DarkMode/DarkMode/DarkMode";

//import DasbordHome from "./Pages/Broker/DasbordHome";
//import Dashbord from "./Pages/Broker/Dashbord";

export default function App() {
  return (
    <BrowserRouter>
      {/* <DarkMode /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/donet" element={<Donet />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset_password/:id/:token" element={<ResetPassword />} />
        <Route path="/User-sign-up" element={<UserSignUp />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/Store" element={<Store />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/brokers" element={<Broker />} />
        <Route path="/caristing-only" element={<CarListingonly />} />
        <Route path="/houseisting-only" element={<Houselistingonly />} />
        <Route path="/search" element={<Search />} />
        <Route path="/ContactPage" element={<ContactPage />} />
        <Route path="/listing/:listingId" element={<HouseListing />} />
        <Route path="/listings/:listingId" element={<CarListing />} />
        <Route element={<PrivateRoute />}>
          <Route path="/Profile" element={<Profile />} />
        </Route>
        <Route element={<BPrivateRoute />}>
          <Route path="/Bprofile" element={<Bprofile />} />
          <Route path="/CarListingPage" element={<CarListingPage />} />
          <Route path="/HouseListingPage" element={<HouseListingPage />} />
          <Route
            path="/update-listing/:listingId"
            element={<CreateListing />}
          />
          <Route
            path="/update-listings/:listingId"
            element={<UpdateCarListing />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
