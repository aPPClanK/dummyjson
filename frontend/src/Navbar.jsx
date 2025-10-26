import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav
      style={{
        background: "#333",
        color: "white",
        padding: "10px 20px",
        boxSizing: "border-box",
        MozBoxSizing: "border-box",
        WebkitBoxSizing: "border-box",
        display: "flex",
        position: "fixed",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "sans-serif"
      }}
    >
      <div style={{ fontWeight: "bold" }}>DummyJSON</div>

      <div style={{ display: "flex", gap: "15px" }}>
        <NavLink to="/" style={({ isActive }) => ({ color: isActive ? "cyan" : "white", textShadow: isActive ? "cyan 0 0 4px" : "" })}>
          Products
        </NavLink>
        <NavLink to="/todos" style={({ isActive }) => ({ color: isActive ? "cyan" : "white", textShadow: isActive ? "cyan 0 0 4px" : "" })}>
          Todos
        </NavLink>
        <NavLink to="/posts" style={({ isActive }) => ({ color: isActive ? "cyan" : "white", textShadow: isActive ? "cyan 0 0 4px" : "" })}>
          Posts
        </NavLink>
        <NavLink to="/profile" style={({ isActive }) => ({ color: isActive ? "cyan" : "white", textShadow: isActive ? "cyan 0 0 4px" : "" })}>
          Profile
        </NavLink>
      </div>
    </nav>
  );
}
