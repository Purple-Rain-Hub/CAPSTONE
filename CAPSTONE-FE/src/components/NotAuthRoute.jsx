import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NotAuthRoute() {
  const token =
    useSelector((state) => state.auth.token) ||
    localStorage.getItem("jwtToken");
  return token ? <Navigate to="/error" /> : <Outlet />;
}
