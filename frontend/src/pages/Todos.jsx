import { useEffect, useState } from "react";
import { DotsLoader } from "../components/AppLayout";
import { apiFetch } from "../auth/apiFetch";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    async function fetchUserAndTodos() {
      try {
        const userRes = await apiFetch("https://dummyjson-production-47d6.up.railway.app//user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!userRes.ok) throw new Error("Failed to fetch user");
        const userData = await userRes.json();

        const todosRes = await fetch("https://dummyjson-production-47d6.up.railway.app//todos?limit=254");
        if (!todosRes.ok) throw new Error("Failed to fetch todos");
        const todosData = await todosRes.json();

        const filtered = todosData.todos.filter(
          (todo) => todo.userId === userData.id
        );
        setTodos(filtered);
      } catch (err) {
        console.error("Error:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserAndTodos();
  }, []);

  if (loading)
    return (
      <div style={styles.page}>
        <DotsLoader />
      </div>
    );

  if (error)
    return (
      <div style={styles.page}>
        <div style={{ color: "white", fontSize: "18px" }}>
          Error: {error.message}
        </div>
      </div>
    );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>✅ My Todos</h1>

        {todos.length === 0 ? (
          <p style={{ color: "white", textAlign: "center" }}>
            You have no todos yet!
          </p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              style={{
                ...styles.card,
                borderLeft: todo.completed
                  ? "6px solid #22c55e"
                  : "6px solid #f97316",
              }}
            >
              <div style={styles.todoInfo}>
                <h3
                  style={{
                    ...styles.todoTitle,
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.todo}
                </h3>
                <span
                  style={{
                    ...styles.status,
                    background: todo.completed ? "#22c55e" : "#f97316",
                  }}
                >
                  {todo.completed ? "Completed" : "Pending"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export const styles = {
  page: {
    background: "linear-gradient(135deg, #6EE7B7, #3B82F6)",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "sans-serif",
  },
  container: {
    maxWidth: "700px",
    margin: "0 auto",
    padding: "0 20px",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#f2f2f2",
    textShadow: "#000000ff 0px 0px 4px",
  },
  card: {
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    marginBottom: "15px",
    padding: "15px 20px",
    transition: "transform 0.2s",
  },
  todoInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "50px",
  },
  todoTitle: {
    margin: 0,
    fontSize: "16px",
    color: "#111",
  },
  status: {
    color: "white",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "bold",
  },
};
