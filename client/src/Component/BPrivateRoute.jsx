import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function BPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to="/Sign-In" />;
}
