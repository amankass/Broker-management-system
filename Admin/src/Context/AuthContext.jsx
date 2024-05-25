import React, { useState, useEffect, useContext } from "react";
import getAuth from "../utils/auth.jsx";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState(null);

  const value = {
    userRole,
    userId,
  };

  console.log("values offffff", value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAuth();
        if (response.token) {
          setUserRole(response.userRole);
          setUserId(response.userId);
        }
      } catch (error) {
        console.error("Error fetching authentication:", error);
      }
    };

    fetchData();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
