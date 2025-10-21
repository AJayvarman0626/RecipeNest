import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // 🛡️ If user not logged in → send to login
  if (!user) return <Navigate to="/login" replace />;

  // 🧑‍💼 Role-based protection
  if (role && user.role !== role) {
    // if admin tries to open explore, or customer tries to open admin
    return <Navigate to="/" replace />;
  }

  // ✅ If all good → render child component
  return children;
}
