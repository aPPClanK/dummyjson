import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8000/user/me", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
          credentials: "include"
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Ошибка загрузки профиля");

        setUser(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!user) return <p>Загрузка профиля...</p>;
  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", textAlign: "center", fontFamily: "sans-serif"}}>
      <img
        src={user.image}
        alt={user.firstName}
        style={{ width: "100px", borderRadius: "50%", marginBottom: "10px" }}
      />
      <h2>{user.firstName} {user.lastName}</h2>
      <p><b>Username:</b> {user.username}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Gender:</b> {user.gender}</p>
      <button
        onClick={() => {
          localStorage.removeItem("accessToken");
          navigate("/login");
        }}
        style={{
          marginTop: "20px",
          padding: "8px 16px",
          border: "none",
          background: "#e74c3c",
          color: "white",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Выйти
      </button>
    </div>
  );
}
