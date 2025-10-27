import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { apiFetch } from "../auth/apiFetch";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await apiFetch(`https://dummyjson-production-47d6.up.railway.app//products/${id}`);
        const result = await res.json();
        setProduct(result);
      } catch (err) {
        console.error("Error loading product:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div style={styles.page}>
        <h2 style={{ color: "#fff", textShadow: "0 0 4px #000" }}>Loading...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={styles.page}>
        <h2 style={{ color: "#fff", textShadow: "0 0 4px #000" }}>Product not found</h2>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <Link to="/" style={styles.backLink}>← Back to products</Link>

        <h1 style={styles.title}>{product.title}</h1>

        <div style={styles.card}>
          <img src={product.thumbnail} alt={product.title} style={styles.image} />

          <div style={styles.info}>
            <h2 style={styles.productTitle}>{product.title}</h2>
            <p style={styles.desc}>{product.description}</p>

            <div style={styles.details}>
              <span><b>Category:</b> {product.category}</span>
              <span><b>Brand:</b> {product.brand}</span>
              <span><b>Price:</b> ${product.price}</span>
              <span><b>Rating:</b> ⭐ {product.rating}</span>
              <span><b>Stock:</b> {product.stock}</span>
            </div>
          </div>
        </div>

        <h2 style={styles.reviewsTitle}>Reviews</h2>
        {product.reviews && product.reviews.length > 0 ? (
          <div style={styles.reviews}>
            {product.reviews.map((r, i) => (
              <div key={i} style={styles.reviewCard}>
                <div style={{ marginBottom: "6px" }}>
                  <b>{r.reviewerName}</b> — ⭐ {r.rating}
                </div>
                <p style={{ margin: 0 }}>{r.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: "#f2f2f2", textAlign: "center" }}>No reviews yet.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "linear-gradient(135deg, #6EE7B7, #3B82F6)",
    minHeight: "100vh",
    display: "flex",
    padding: "40px 0 40px",
    justifyContent: "center",
    alignItems: "flex-start",
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
    color: "#f2f2f2",
    textShadow: "0 0 4px #000",
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
    width: "250px",
    objectFit: "cover",
  },
  info: {
    padding: "15px",
    flex: 1,
  },
  productTitle: {
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
    gap: "5px",
  },
  backLink: {
    display: "flex",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    marginTop: "40px",
    padding: "5px",
    background: "#333",
    borderRadius: "12px",
    width: "fit-content",
    color: "#f2f2f2",
    textDecoration: "none",
    fontWeight: "bold",
    textShadow: "0 0 3px #000",
  },
  reviewsTitle: {
    color: "#f2f2f2",
    textShadow: "0 0 4px #000",
    marginTop: "30px",
    textAlign: "center",
  },
  reviews: {
    display: "grid",
    gap: "15px",
    marginTop: "15px",
  },
  reviewCard: {
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    padding: "15px",
  },
};
