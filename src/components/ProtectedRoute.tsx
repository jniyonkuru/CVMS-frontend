import {useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import  { JSX } from "react";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isPending } = useAuth();
  const navigate= useNavigate();


  if (!isAuthenticated && !isPending) {
    navigate("/");
  }

  return children;
}

export default ProtectedRoute;