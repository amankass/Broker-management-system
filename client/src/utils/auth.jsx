// Function to read the data from the user's local storage
const getAuth = () => {
  try {
    const token = localStorage.getItem("token");

    console.log(token);

    if (token) {
      const decodedToken = decodeTokenPayload(token);
      return {
        userRole: decodedToken.role, // Use decodedToken.role
        userId: decodedToken.id, // Use decodedToken.id
        brokerStatus: decodedToken.status,
        fname: decodedToken.fname,
        token: token,
      };
    } else {
      console.log("Token is not found in local storage.");
    }
  } catch (error) {
    console.error("Error parsing user token:", error);
  }
  return {};
};

// Function to decode the payload from the token
const decodeTokenPayload = (token) => {
  try {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    return decodedPayload;
  } catch (error) {
    console.error("Error decoding token payload:", error);
    return {};
  }
};

export default getAuth;
