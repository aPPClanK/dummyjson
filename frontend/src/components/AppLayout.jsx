import { Routes, Route, useLocation } from "react-router";
import Navbar from "./Navbar";
import ProductList from "../pages/ProductList";
import Product from "../pages/Product";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Todos from "../pages/Todos";
import Posts from "../pages/Posts";
import Users from "../pages/Users";
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
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </>
  );
}
