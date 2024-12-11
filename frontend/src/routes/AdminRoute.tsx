import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

type Props = { children: React.ReactNode };

const AdminRoute = ({ children }: Props) => {
  const location = useLocation();
  const { isLoggedIn, user } = useAuth();
  return isLoggedIn() && user?.role === "ADMIN" ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default AdminRoute;
