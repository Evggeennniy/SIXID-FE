import React from "react";
import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to='/auth/login' replace />;
};

export default ProtectedRoute;
