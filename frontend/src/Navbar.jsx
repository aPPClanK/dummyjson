import React from "react";
import { Link } from "react-router"; // не react-router-dom!

export default function Navbar() {
  return (
    <nav
      style={{
        background: "#333",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "sans-serif"
      }}
    >
      <div style={{ fontWeight: "bold" }}>DummyJSON</div>

      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/products" style={{ color: "white", textDecoration: "none" }}>
          Products
        </Link>
        <Link to="/todos" style={{ color: "white", textDecoration: "none" }}>
          Todos
        </Link>
        <Link to="/posts" style={{ color: "white", textDecoration: "none" }}>
          Posts
        </Link>
        <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>
          Profile
        </Link>
      </div>
    </nav>
  );
}
