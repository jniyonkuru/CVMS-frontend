import {useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import  { JSX, useEffect } from "react";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isPending } = useAuth();
  const navigate= useNavigate();

useEffect(()=>{
  if (!isAuthenticated && !isPending) {
    navigate("/");
  }

},[isAuthenticated,isPending])



  return children;
}

export default ProtectedRoute;