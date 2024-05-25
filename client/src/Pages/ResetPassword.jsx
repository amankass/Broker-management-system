import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Header from "../Component/Header";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { id, token } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/auth/reset-password/${id}/${token}`, {
        password,
      });

      console.log("Response:", res.data);
      navigate("/Sign-In");
      // Handle success response
    } catch (error) {
      console.error("Error:", error);
      // Handle error response
    }
  };

  return (
    <>
      <Header isFixed={true}/>
      <main className="bg-gray-100 min-h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md -mt-32">
          <div className="bg-white shadow-md rounded-md py-10 px-12">
            <h1 className="text-3xl font-bold text-center mb-8">
              Reset Password
            </h1>
            <form className="space-y-10" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="Password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  //   value={formData.email}
                  autoComplete="on"
                  required
                  className="block w-full h-12 pl-8 pr-4 text-sm 
                  text-gray-700 border border-gray-300 appearance-none rounded-xl focus:outline-none focus:ring-0 focus:border-blue-600 
                  peer"
                  placeholder="Enter New Password"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-user w-5 h-5 text-gray-500 ml-2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="11" r="3" />
                  </svg>
                </div>
                <label
                  htmlFor="email"
                  className="absolute text-base text-gray-700 -translate-y-11 scale-75 transform origin-[top,left] 
                  top-9 z-10 peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-110 
                  peer-placeholder-shown:translate-y-3 peer-focus:scale-85 peer-error:text-red-500 peer-error:dark:text-red-400"
                >
                  Your New Password
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 rounded-full bg-slate-700 font-bold text-white hover:bg-red-600 uppercase duration-600 
                hover:text-white transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  );
};

export default ResetPassword;
