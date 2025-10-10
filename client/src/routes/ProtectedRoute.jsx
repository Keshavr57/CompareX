// src/routes/ProtectedRoute.jsx
import React from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isLoaded, isSignedIn } = useUser();

  // Wait till Clerk finishes checking auth state
  if (!isLoaded) {
    return <div className="text-white text-center p-10">Checking authentication...</div>;
  }

  // If user NOT logged in → go back to home page (login modal opens from Navbar)
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}
