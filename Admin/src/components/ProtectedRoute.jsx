import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const storedData = localStorage.getItem("randomData");

  // Prevent access to admin routes if there is no random data
  if (!storedData) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
