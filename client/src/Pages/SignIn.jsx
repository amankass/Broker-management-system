{
}
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../Component/OAuth";
//import { useAuth } from "../Context/Authcontext";
import Header from "../Component/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const { userRole } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/SignIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.status === 200) {
        // Check if response status is 200
        const data = await res.json();
        console.log("hhhhhhh", data);
        if (data.success === false) {
          dispatch(signInFailure(data.message));
          return;
        }
        dispatch(signInSuccess(data));
        localStorage.setItem("token", data.token); // Set token in local storage

        const tokenData = JSON.parse(atob(data.token.split(".")[1]));
        const userRole = tokenData.role;

        let redirectTo;

        if (userRole === "broker") {
          redirectTo = "/BProfile";
        } else if (userRole === "user") {
          redirectTo = "/Profile";
        } else {
          // Handle other roles or scenarios
          redirectTo = "/";
        }
        toast.success("User login successful!", { autoClose: 1000 });
        setTimeout(() => {
          navigate(redirectTo);
          window.location.reload();
        }, 1000); // Adjust the time according to your needs
      } else {
        console.error("Error:", res.statusText);
        dispatch(signInFailure("Please enter correct password"));
        toast.error("Please enter correct password"); // Display error message
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      toast.error(error.message); // Display error message
    }
  };

  return (
    <>
      {" "}
      <Header isFixed={true} />
      <main className="bg-gray-100 min-h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md mt-32">
          <div className="bg-white shadow-md rounded-md py-10 px-12">
            <h1 className="text-3xl font-bold text-center mb-8">Log in</h1>
            <form className="space-y-10" onSubmit={handleSubmit}>
              <div>
                {/* <label htmlFor='username' className='sr-only'>Enter username</label> */}
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    onChange={handleChange}
                    autoComplete="on"
                    required
                    className="block w-full h-12 pl-8 pr-4 text-sm 
                  text-gray-700 border border-gray-300 appearance-none rounded-xl focus:outline-none focus:ring-0 focus:border-blue-600 
                  peer"
                    placeholder="Enter emal"
                    aria-describedby="emailError"
                    aria-invalid="false"
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
                       top-9 z-10 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-110 
                       peer-placeholder-shown:translate-y-3 peer-focus:scale-85 peer-error:text-red-500 peer-error:dark:text-red-400"
                  >
                    Your Email
                  </label>
                </div>
                <p id="usernameError" className="sr-only"></p>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Enter password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    onChange={handleChange}
                    required
                    className="block w-full h-12 pl-8 pr-4 text-sm text-gray-700 
                  border border-gray-300 appearance-none rounded-xl focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder="Enter password"
                    aria-describedby="passwordError"
                    aria-invalid="false"
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
                      className="feather feather-lock w-5 h-5 text-gray-500 ml-2"
                    >
                      <rect x="3" y="11" width="18" height="8" rx="2" ry="2" />
                      <path d="M7 13m5 0L12 18m-5 0L7 13" />
                    </svg>
                  </div>
                  <label
                    htmlFor="password"
                    className="absolute text-base text-gray-700 -translate-y-11 scale-75 transform origin-[top,left] 
                       top-9 z-10 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:scale-85 peer-error:text-red-500 
                       peer-error:dark:text-red-400 peer-placeholder-shown:scale-110 peer-placeholder-shown:translate-y-3 peer-focus:scale-85 
                       peer-error:text-red-500 peer-error:dark:text-red-400"
                  >
                    Your password
                  </label>
                </div>
                <p id="passwordError" className="sr-only"></p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    id="rememberMe"
                    className="h-5 w-5 text-blue-600 cursor-pointer focus:ring-0"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="pl-2 font-semibold select-none"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="font-semibold underline decoration-solid text-blue-600 hover:decoration-dotted cursor-pointer"
                >
                  Forgot password?
                </Link>
              </div>
              <div>
                <Link
                  to="/Sign-Up"
                  className="inline-block text-blue-600 hover:underline hover:text-orange-500"
                >
                  New here? Create an account
                </Link>
              </div>

              <button
                //disabled={loading}
                type="submit"
                className="w-full py-2 px-4 rounded-full bg-slate-700 font-bold text-white hover:bg-red-600 uppercase duration-600 
             hover:text-white transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Sign In
              </button>
              <OAuth />
            </form>
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  );
};
export default SignIn;
