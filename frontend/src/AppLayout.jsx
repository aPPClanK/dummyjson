import React from "react";
import { Routes, Route, useLocation } from "react-router";
import Navbar from "./Navbar";
import Products from "./Products";
import Profile from "./Profile";
import Login from "./Login";

export function DotsLoader() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "60vh",
      gap: "6px"
    }}>
      <div style={dot(0)}></div>
      <div style={dot(0.1)}></div>
      <div style={dot(0.2)}></div>
    </div>
  );
}

function dot(delay) {
  return {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#d9e5f7ff",
    animation: `bounce 0.9s infinite ${delay}s ease-in-out`,
  };
}

export function ProtectedRoute({ children }) {
  const token = localStorage.getItem("accessToken");
  return token ? children : <Navigate to="/login" />;
}

export default function AppLayout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
