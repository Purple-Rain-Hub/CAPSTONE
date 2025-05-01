import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute() {
  const token =
    useSelector((state) => state.auth.token) ||
    localStorage.getItem("jwtToken");
  return token ? <Outlet /> : <Navigate to="/login" />;
}
