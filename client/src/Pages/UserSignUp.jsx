import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Component/Header";
import { toast } from "react-toastify";
import {
  isValidEmail,
  isValidPassword,
  isValidPhone,
  containsNumber, // Import the containsNumber function
} from "../utils/validation"; // Import validation functions
import io from "socket.io-client"; // Import socket.io-client

const UserSignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  ///////////////////////////
  useEffect(() => {
    const socket = io("http://localhost:5173"); // Replace with your backend URL
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("newUserRegistered", () => {
      // Display admin notification or perform any action you want
      toast.info("A new user has registered.");
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  //////////////////////////////////////////////////////////////////////
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });

    // Validate individual fields and set error messages
    let newError = { ...error };
    switch (id) {
      case "fname":
      case "lname":
      case "username":
        if (value.trim() === "") {
          newError[id] = "This field is required";
        } else if (containsNumber(value)) {
          newError[id] = "This field cannot contain numbers";
        } else {
          newError[id] = null;
        }
        break;
      case "password":
        newError[id] =
          value.length < 6
            ? "Password must be at least 6 characters long"
            : null;
        break;
      case "email":
        newError[id] = !isValidEmail(value) ? "Invalid email address" : null;
        break;
      case "mobile":
        newError[id] = !isValidPhone(value) ? "Invalid phone number" : null;
        break;
      default:
        break;
    }
    setError(newError);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there are any errors
    if (Object.values(error).some((err) => err !== null)) {
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/UserSignUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError({ general: data.message }); // Set general error message
        return;
      }
      setLoading(false);
      setError({});
      navigate("/Sign-In");
      toast.success("Sign up successful! Please sign in."); // Display success message as toast
    } catch (error) {
      setLoading(false);
      setError({ general: error.message });
    }
  };

  return (
    <>
      <Header isFixed={true} />
      <div className="flex flex-col pt-24">
        <div className="rounded-md shadow-xl shadow-black border px-20 w-max self-center p-5 mt-5">
          <form onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold text-center mb-8 ">SignUp</h1>
            <div className="flex flex-col md:flex-row md:-mx-4">
              <div className="w-full md:w-1/2 px-4 mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  First Name *
                </label>
                <input
                  type="text"
                  className={`block border border-gray-300 w-full p-3 rounded ${
                    error.fname ? "border-red-500" : ""
                  }`}
                  id="fname"
                  onChange={handleChange}
                  placeholder="First Name"
                />
                {error.fname && (
                  <p className="text-red-500 mt-1">{error.fname}</p>
                )}
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
                  className={`block border border-gray-300 w-full p-3 rounded ${
                    error.lname ? "border-red-500" : ""
                  }`}
                  id="lname"
                  onChange={handleChange}
                  placeholder="Last Name"
                />
                {error.lname && (
                  <p className="text-red-500 mt-1">{error.lname}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:-mx-4">
              <div className="w-full md:w-1/2 px-4 mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Password *
                </label>
                <input
                  type="password"
                  className={`block border border-gray-300 w-full p-3 rounded ${
                    error.password ? "border-red-500" : ""
                  }`}
                  id="password"
                  onChange={handleChange}
                  placeholder="Password"
                />
                {error.password && (
                  <p className="text-red-500 mt-1">{error.password}</p>
                )}
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
                  className={`block border border-gray-300 w-full p-3 rounded ${
                    error.username ? "border-red-500" : ""
                  }`}
                  id="username"
                  onChange={handleChange}
                  placeholder="Username"
                />
                {error.username && (
                  <p className="text-red-500 mt-1">{error.username}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:-mx-4">
              <div className="w-full md:w-1/2 px-4 mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email *
                </label>
                <input
                  type="text"
                  className={`block border border-gray-300 w-full p-3 rounded ${
                    error.email ? "border-red-500" : ""
                  }`}
                  id="email"
                  onChange={handleChange}
                  placeholder="Email"
                />
                {error.email && (
                  <p className="text-red-500 mt-1">{error.email}</p>
                )}
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
                  className={`block border border-gray-300 w-full p-3 rounded ${
                    error.mobile ? "border-red-500" : ""
                  }`}
                  id="mobile"
                  onChange={handleChange}
                  placeholder="+2519......."
                />
                {error.mobile && (
                  <p className="text-red-500 mt-1">{error.mobile}</p>
                )}
              </div>
            </div>

            <div className="flex justify-center items-center">
              <button
                disabled={loading}
                type="submit"
                className="bg-slate-700 justify-center mb-10 w-64 text-white p-2 rounded-md hover:bg-red-600 font-bold"
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
            </div>
          </form>
          <div className="flex">
            <span className="p-3 -mt-10 pl-24 font-bold">
              Have an Account?{" "}
              <Link to="/Sign-In" className="text-blue-600 hover:text-red-600">
                Login
              </Link>
            </span>
          </div>
        </div>
        {error.general && (
          <p className="text-red-500 mt-5 ml-32">{error.general}</p>
        )}
      </div>
    </>
  );
};

export default UserSignUp;
