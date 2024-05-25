import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
// import sitepaymentsystem from "../Image/sitepaymentsystem.jpg";
// import { FaPhone, FaTelegram, FaWhatsapp } from "react-icons/fa";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import Hearder from "../Component/Header.jsx";

import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signOutUserStart,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

//Firebase Storege
// allow read;
// allow write: if
// request.resource.size < 5 * 1024 * 1024 &&
// request.resource.contentType.matches('image/.*')

export default function Profile() {
  const fileRef = useRef(null);
  const { userId, brokerStatus } = useAuth();
  const [showPendingMessage, setShowPendingMessage] = useState(false);
  const [file, setFile] = useState(undefined);
  console.log(file);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/broker/get/${userId}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }
        setFormData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/broker/update/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);

      setTimeout(() => {
        setUpdateSuccess(false);
      }, 500);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleRealEstateListingClick = () => {
    if (brokerStatus !== "approved") {
      setShowPendingMessage(true);
    }
  };

  const handleAutomotiveListingClick = () => {
    if (brokerStatus !== "approved") {
      setShowPendingMessage(true);
    }
  };

  useEffect(() => {
    let timeout;
    if (showPendingMessage) {
      timeout = setTimeout(() => {
        setShowPendingMessage(false);
      }, 3000); // Adjust the duration as needed (3000 milliseconds = 3 seconds)
    }
    return () => clearTimeout(timeout);
  }, [showPendingMessage]);

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/broker/delete/${userId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignOut = async () => {
    // Display confirmation dialog
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    if (!confirmLogout) {
      return; // Do nothing if user cancels logout
    }

    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));

      // Redirect to the Sign-In route
      window.location.href = "/Sign-In";
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
    localStorage.removeItem("token");
  };
  // const handleSignOut = async () => {
  //   try {
  //     dispatch(signOutUserStart());
  //     const res = await fetch("/api/auth/signout");
  //     const data = await res.json();
  //     if (data.success === false) {
  //       dispatch(deleteUserFailure(data.message));
  //       return;
  //     }
  //     dispatch(deleteUserSuccess(data));

  //     // Redirect to the Sign-In route
  //     window.location.href = "/Sign-In";
  //   } catch (error) {
  //     dispatch(deleteUserFailure(data.message));
  //   }
  //   localStorage.removeItem("token");
  // };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/broker/listings/${userId}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      // Delete from houselist
      const houseRes = await fetch(`/api/houeslist/delete/${listingId}`, {
        method: "DELETE",
      });
      const houseData = await houseRes.json();
      if (houseData.success === false) {
        console.log(houseData.message);
        return;
      }

      // Delete from carlist
      const carRes = await fetch(`/api/carlist/delete/${listingId}`, {
        method: "DELETE",
      });
      const carData = await carRes.json();
      if (carData.success === false) {
        console.log(carData.message);
        return;
      }

      // Remove deleted listing from user listings
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Hearder isFixed={true} />
      <div className="pt-24">
        <h1 className="text-3xl font-bold text-center my-7">Broker Profile</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept=" image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar}
            alt="profile"
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          />

          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700">
                Error Image upload (image must be less than 5 Mb)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">
                Image successfully uploaded!
              </span>
            ) : (
              ""
            )}
          </p>

          <div className="rounded-md shadow-xl shadow-black border px-20 w-max self-center p-5 -mt-15">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 px-4 mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  First Name *
                </label>
                <input
                  type="text"
                  defaultValue={formData.fname}
                  className="block border border-gray-300 w-full p-3 rounded"
                  id="fname"
                  onChange={handleChange}
                  placeholder="First Name"
                />
              </div>

              <div className="w-full md:w-1/2 px-4 mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  defaultValue={formData.lname}
                  className="block border border-gray-300 w-full p-3 pr-20 rounded"
                  id="lname"
                  onChange={handleChange}
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 px-4 mb-4 relative">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Password *
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="block border border-gray-300 w-full p-3 pr-10 rounded"
                  id="password"
                  onChange={handleChange}
                  placeholder="Password"
                />
                <div
                  className="absolute inset-y-0 right-5 flex items-center pt-8 pr-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>

              <div className="w-full md:w-1/2 px-4 mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Username *
                </label>
                <input
                  type="text"
                  defaultValue={formData.username}
                  className="block border border-gray-300 w-full p-3 rounded"
                  id="username"
                  onChange={handleChange}
                  placeholder="Username"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 px-4 mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email *
                </label>
                <input
                  type="text"
                  defaultValue={formData.email}
                  className="block border border-gray-300 w-full p-3 rounded"
                  id="email"
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              <div className="w-full md:w-1/2 px-4 mb-4">
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Phone No. *
                </label>
                <input
                  type="text"
                  defaultValue={formData.mobile}
                  className="block border border-gray-300 w-full p-3 rounded"
                  id="mobile"
                  onChange={handleChange}
                  placeholder="Phone No."
                />
              </div>
            </div>

            {/* <div className="flex flex-col md:flex-row md:-mx-4">
              <div className="w-full md:w-1/2 mb-4 ml-10">
                <label
                  htmlFor="experiance"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Experience
                </label>
                <select
                  id="experiance"
                  onChange={handleChange}
                  defaultValue={formData.experiance}
                  className="block border border-gray-300 w-full md:w-3/4 p-3 rounded"
                >
                  <option value="">Select Experience</option>
                  <option value="1 years">1 Years</option>
                  <option value="2 years">2 Years</option>
                  <option value="3 years">3 Years</option>
                  <option value="4 years">4 Years</option>
                  <option value="5 years">5 Years</option>
                  <option value="more">More than 5 Years</option>
                </select>
              </div>
              <div className="w-full md:w-1/2 mb-4 -mr-10">
                <label
                  htmlFor="TypeofBroker"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Type of Broker
                </label>
                <select
                  id="TypeofBroker"
                  onChange={handleChange}
                  defaultValue={formData.TypeofBroker}
                  className="block border border-gray-300 w-full md:w-3/4 p-3 rounded"
                >
                  <option value="">Select type of Broker</option>
                  <option value="Automotive only">Automotive only</option>
                  <option value="RealEstate only">RealEstate only</option>
                  <option value="BothBroker">BothBroker</option>
                </select>
              </div>
            </div> */}

            <div className="flex flex-col items-center">
              <button
                type="submit"
                className="bg-slate-700 w-80 text-white p-2 rounded-md hover:bg-red-600 font-bold mt-4"
              >
                UPDATE
              </button>
              <>
                <Link
                  className={`bg-green-700 w-80 text-center font-bold mt-4 p-2 hover:bg-red-600 text-white rounded-md ${
                    brokerStatus !== "approved" &&
                    "cursor-not-allowed opacity-50"
                  }`}
                  to={brokerStatus === "approved" ? "/HouseListingPage" : "#"}
                  onClick={() => {
                    if (brokerStatus === "pending") {
                      window.alert(
                        "You are pending please wait approval to create listings."
                      );
                    } else if (brokerStatus === "rejected") {
                      window.alert(
                        "You are rejected please wait approval to create listings."
                      );
                    }
                    handleRealEstateListingClick();
                  }}
                >
                  CREATE REAL ESTATE LISTING
                </Link>
                <Link
                  className={`bg-green-700 w-80 text-center font-bold mt-4 p-2 hover:bg-red-600 text-white rounded-md ${
                    brokerStatus !== "approved" &&
                    "cursor-not-allowed opacity-50"
                  }`}
                  to={brokerStatus === "approved" ? "/CarListingPage" : "#"}
                  onClick={() => {
                    if (brokerStatus === "pending") {
                      window.alert(
                        "You are pending approval to create listings."
                      );
                    } else if (brokerStatus === "rejected") {
                      window.alert(
                        "You are rejected approval to create listings."
                      );
                    }
                    handleAutomotiveListingClick();
                  }}
                >
                  CREATE AUTOMOTIVE LISTING
                </Link>
              </>
            </div>
            <div className="flex font-semibold justify-between mt-5 mr-20 ml-20">
              <span
                onClick={handleDeleteUser}
                className="text-red-700 cursor-pointer font-bold" // Added mr-4 for right margin
              >
                Delete Account
              </span>
              <span
                onClick={handleSignOut}
                className="text-red-700 cursor-pointer font-bold"
              >
                Sign Out
              </span>
            </div>
            {/* <p className="text-red-700 mt-5 ml-32"></p>
            <p className="text-green-700 font-semibold mt-5 ml-32">
              {updateSuccess ? "User is Updated Successfully!" : ""}
            </p> */}
            {(brokerStatus === "pending" || brokerStatus === "rejected") && (
              <center>
                <span className="font-semibold">
                  Pay System fee to Get Access
                  <Link
                    to={"/donet"}
                    className="text-color-red text-red-700 hover:text-blue-700"
                  >
                    {" "}
                    click to Pay
                  </Link>
                </span>
              </center>
            )}
            <br />
            <button
              onClick={handleShowListings}
              className="text-green-700 w-full"
            >
              Show Listing
            </button>
            <p className="text-red-700 mt-5">
              {showListingsError ? "Error showing listings" : ""}
            </p>

            {userListings && userListings.length > 0 && (
              <div className="flex flex-col gap-4">
                <h1 className="text-center mt-7 text-2xl font-semibold">
                  Your Listings
                </h1>
                {userListings.map((listing) => (
                  <div
                    key={listing._id}
                    className="border rounded-lg p-3 flex justify-between items-center gap-4"
                  >
                    <Link
                      to={
                        listing.model
                          ? `/listings/${listing._id}`
                          : `/listing/${listing._id}`
                      }
                    >
                      <img
                        src={listing.imageUrls[0]}
                        alt="listing cover"
                        className="h-16 w-16 object-contain"
                      />
                    </Link>
                    <Link
                      className="text-slate-700 font-semibold hover:underline truncate flex-1"
                      to={
                        listing.model
                          ? `/listings/${listing._id}`
                          : `/listing/${listing._id}`
                      }
                    >
                      <p>{listing.name ? listing.name : listing.model}</p>
                    </Link>

                    <div className="flex flex-col item-center">
                      <button
                        onClick={() => handleListingDelete(listing._id)}
                        className="text-red-700 uppercase"
                      >
                        Delete
                      </button>
                      <Link
                        to={
                          listing.model
                            ? `/update-listings/${listing._id}`
                            : `/update-listing/${listing._id}`
                        }
                      >
                        <button className="text-green-700 uppercase">
                          Edit
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
