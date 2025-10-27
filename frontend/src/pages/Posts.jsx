import { useEffect, useState } from "react";
import { DotsLoader } from "../components/AppLayout";
import { apiFetch } from "../auth/apiFetch";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    async function fetchUserAndPosts() {
      try {
        const userRes = await apiFetch("https://dummyjson-production-47d6.up.railway.app/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();

        const postsRes = await fetch("https://dummyjson-production-47d6.up.railway.app/posts?limit=251");
        const postsData = await postsRes.json();

        const filtered = postsData.posts.filter(
          (post) => post.userId === userData.id
        );
        setPosts(filtered);
      } catch (err) {
        console.error("Error:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserAndPosts();
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
        <h1 style={styles.title}>📰 My Posts</h1>

        {posts.map((post) => (
          <div key={post.id} style={styles.card}>
            <div style={styles.info}>
              <h3 style={styles.postTitle}>{post.title}</h3>
              <p style={styles.body}>{post.body}</p>

              <div style={styles.tags}>
                {post.tags.map((tag, i) => (
                  <span key={i} style={styles.tag}>
                    #{tag}
                  </span>
                ))}
              </div>

              <div style={styles.stats}>
                <span>👍 {post.reactions?.likes}</span>
                <span>👎 {post.reactions?.dislikes}</span>
                <span>👁️ {post.views}</span>
              </div>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <div style={{ textAlign: "center", color: "white", marginTop: "30px" }}>
            No posts found 😔
          </div>
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
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    marginBottom: "20px",
    padding: "20px",
  },
  info: {
    flex: 1,
  },
  postTitle: {
    margin: "0 0 10px",
    color: "#111",
    fontSize: "18px",
  },
  body: {
    color: "#444",
    fontSize: "15px",
    lineHeight: "1.5",
    marginBottom: "10px",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginBottom: "10px",
  },
  tag: {
    background: "#E0E7FF",
    color: "#1E3A8A",
    padding: "4px 8px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "500",
  },
  stats: {
    display: "flex",
    gap: "12px",
    color: "#555",
    fontSize: "14px",
    marginTop: "6px",
  },
};