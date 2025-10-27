import { useEffect, useState } from "react";
import { DotsLoader } from "../components/AppLayout";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    async function fetchUsers() {
      try {
        const meRes = await fetch("https://dummyjson-production-47d6.up.railway.app//user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const meData = await meRes.json();

        if (meData.role !== "admin") {
          throw new Error("Access denied: admin only");
        }

        const skip = (page - 1) * limit;
        const res = await fetch(`https://dummyjson-production-47d6.up.railway.app//users?limit=${limit}&skip=${skip}`);
        const data = await res.json();
        setUsers(data.users || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [page, limit]);

  if (loading)
    return (
      <div style={styles.page}>
        <DotsLoader />
      </div>
    );

  if (error)
    return (
      <div style={styles.page}>
        <div style={{ color: "white" }}>
          {error.message === "Access denied: admin only"
            ? "Access denied: admin only"
            : `Ошибка: ${error.message}`}
        </div>
      </div>
    );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>👥 Users</h1>

        {users.map((u) => (
          <div key={u.id} style={styles.card}>
            <img
              src={u.image || "https://via.placeholder.com/150"}
              alt={u.firstName}
              style={styles.image}
            />
            <div style={styles.info}>
              <h3 style={styles.userName}>
                {u.firstName} {u.lastName}
              </h3>
              <p style={styles.desc}>{u.email}</p>
              <div style={styles.details}>
                <span>
                  <b>🧭 Username:</b> {u.username}
                </span>
                <span>
                  <b>🏢 Company:</b> {u.company?.name || "N/A"}
                </span>
                <span>
                  <b>🎓 Role:</b> {u.role || "user"}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div style={styles.pagination}>
            <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            style={{
                ...styles.button,
                background: page === 1 ? "#ccc" : "#c9dcfcff",
                cursor: page === 1 ? "not-allowed" : "pointer",
            }}
            >
            ⬅️ Back
            </button>

            <span style={styles.pageText}>
            Page{" "}
            <input
                type="text"
                value={page}
                onChange={(e) => {
                const val = Number(e.target.value);
                if (!isNaN(val) && val > 0) setPage(val);
                }}
                style={styles.pageInput}
            />
            </span>

            <button onClick={() => setPage(page + 1)} style={styles.button}>
            Next ➡️
            </button>
        </div>
      </div>
    </div>
  );
}

export const styles = {
  page: {
    background: "linear-gradient(135deg, #6EE7B7, #3B82F6)",
    minHeight: "100vh",
    display: "flex",
    padding: "40px 0 40px",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "sans-serif",
  },
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "0 20px",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#f2f2f2ff",
    textShadow: "#000000ff 0px 0px 4px",
  },
  card: {
    display: "flex",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    marginBottom: "20px",
    overflow: "hidden",
  },
  image: {
    width: "150px",
    objectFit: "cover",
  },
  info: {
    padding: "15px",
    flex: 1,
  },
  userName: {
    margin: "0 0 8px",
    color: "#111",
  },
  desc: {
    color: "#555",
    fontSize: "14px",
    marginBottom: "10px",
  },
  details: {
    fontSize: "14px",
    color: "#333",
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },
  pagination: {
    background: "white",
    borderRadius: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "320px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
    gap: "12px",
    padding: "12px",
    marginTop: "30px",
  },
  button: {
    background: "#c9dcfcff",
    color: "black",
    borderRadius: "8px",
    padding: "8px 16px",
    cursor: "pointer",
    transition: "background 0.3s",
    fontWeight: "600",
  },
  pageText: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  pageInput: {
    width: "35px",
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "6px",
    padding: "3px",
    fontSize: "14px",
  },
};
