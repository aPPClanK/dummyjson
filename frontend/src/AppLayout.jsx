import { Routes, Route, useLocation } from "react-router";
import Navbar from "./Navbar";
import Products from "./Products";
import Profile from "./Profile";
import Login from "./Login";
import ProtectedRoutes from "./ProtectedRoutes";

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

export default function AppLayout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Products />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}
