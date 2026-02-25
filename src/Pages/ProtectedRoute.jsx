// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { user, isloading } = useAuth();

  if (isloading) {
    // You can return a loading spinner here if you want
    return <div>Loading...</div>;
  }

  if (!user) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  return children; // Logged in, render the page
};

export default ProtectedRoute;