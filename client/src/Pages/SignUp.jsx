import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Component/Header";
import { toast } from "react-toastify";
//import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  isValidEmail,
  isValidPassword,
  isValidPhone,
  containsNumber, // Import the containsNumber function
} from "../utils/validation"; // Import validation functions
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    mobile: "",
    imageUrls: [],
  });

  const [files, setFiles] = useState([]);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const navigate = useNavigate();

  console.log("file", files);
  console.log("imageurl", formData.imageUrls);
  console.log("formdata", formData);

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
      const res = await fetch("/api/auth/SignUp", {
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
        setError({ general: data.message });
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

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
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
                  value={formData.fname}
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
                  value={formData.lname}
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
                  value={formData.password}
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
                  value={formData.username}
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
                  value={formData.email}
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
                  value={formData.mobile}
                  // inputStyle={{
                  //     height:"53px",
                  //     width:"100%",
                  //     paddingLeft:"45px",
                  //     borderRadius: "12px",
                  //     background:"#f5f5f7"

                  //   }}
                />
                {error.mobile && (
                  <p className="text-red-500 mt-1">{error.mobile}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col flex-1 gap-4">
              <p className="font-semibold">
                Images:
                <span className="font-normal text-gray-600 ml-2">
                  Here Please Upload Licence image will be HighQuality
                </span>
              </p>
              <div className="flex gap-4">
                <input
                  onChange={(e) => setFiles(e.target.files)}
                  className="p-3 border border-gray-300 rounded w-full"
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                />
                <button
                  type="button"
                  disabled={uploading}
                  onClick={handleImageSubmit}
                  className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <button
                disabled={loading}
                type="submit"
                className="bg-slate-700 mb-10 justify-center w-64 text-white p-2 rounded-md hover:bg-red-600 font-bold"
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
            </div>
          </form>

          <div className="flex">
            <span className="p-3 -mt-10 pl-24 font-medium">
              You are not a broker?{" "}
              <Link
                to="/User-sign-up"
                className="text-blue-600 hover:text-red-600"
              >
                User SignUp
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

export default SignUp;
