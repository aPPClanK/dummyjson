import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { DotsLoader } from "../components/AppLayout";
import { apiFetch } from "../auth/apiFetch";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    const fetchProfile = async () => {
      try {
        const res = await apiFetch("http://localhost:8000/user/me", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
          credentials: "include"
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Error loading profile");

        setUser(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!user)
    return (
      <div style={styles.page}>
        <DotsLoader />
      </div>
    );

  if (error)
    return (
      <div style={styles.page}>
        Error: {error.message}
      </div>
    );
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <img
          src={user.image}
          alt={user.firstName}
          style={styles.avatar}
        />
        <h2 style={styles.name}>{user.firstName} {user.lastName}</h2>
        <p style={styles.info}><b>Username:</b> {user.username}</p>
        <p style={styles.info}><b>Email:</b> {user.email}</p>
        <p style={styles.info}><b>Gender:</b> {user.gender}</p>
        <p style={styles.info}><b>Role:</b> {user.role}</p>

        <button
          onClick={() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            navigate("/login");
          }}
          style={styles.logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "linear-gradient(135deg, #6EE7B7, #3B82F6)",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "sans-serif",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "40px 30px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    textAlign: "center",
    maxWidth: "400px",
    width: "90%",
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "10%",
    objectFit: "cover",
    marginBottom: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  name: {
    margin: "10px 0 5px",
    color: "#333",
  },
  info: {
    color: "#555",
    marginBottom: "6px",
    textAlign: "start",
  },
  logout: {
    marginTop: "25px",
    padding: "10px 20px",
    borderRadius: "8px",
    background: "#ef4444",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
};