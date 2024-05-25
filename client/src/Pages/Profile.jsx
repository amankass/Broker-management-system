import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

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
import Hearder from "../Component/Header.jsx";
import { useAuth } from "../context/AuthContext.jsx";
//Firebase Storege
// allow read;
// allow write: if
// request.resource.size < 5 * 1024 * 1024 &&
// request.resource.contentType.matches('image/.*')

export default function Profile() {
  const { userId } = useAuth();
  const fileRef = useRef(null);

  const [file, setFile] = useState(undefined);
  console.log(file);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
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
        const res = await fetch(`/api/user/get/${userId}`);
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
      const res = await fetch(`/api/user/update/${userId}`, {
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
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${userId}`, {
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
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));

      window.location.href = "/Sign-In";
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }

    localStorage.removeItem("token");
  };

  return (
    <div>
      <>
        <Hearder isFixed={true} />
        <h1 className="text-3xl font-bold text-center my-7 pt-24">Profile</h1>
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

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="bg-slate-700 mt-5 w-80 text-white p-2 rounded-md hover:bg-red-600 font-bold"
              >
                UPDATE
              </button>
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
            <p className="text-red-700 mt-5 ml-32"></p>
            <p className="text-green-700 font-semibold mt-5 ml-32">
              {updateSuccess ? "User is Updated Successfully!" : ""}
            </p>
          </div>
        </form>
      </>
    </div>
  );
}
