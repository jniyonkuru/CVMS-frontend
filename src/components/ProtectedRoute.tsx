import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import React, { JSX, useEffect } from "react";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, openLoginModal, isPending } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && !isPending) {
      openLoginModal();
    }
  }, [isAuthenticated, isPending, openLoginModal]);


  if (!isAuthenticated) {
    // Redirect to login page and preserve the current location
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;