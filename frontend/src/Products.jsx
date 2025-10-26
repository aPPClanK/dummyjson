import { useState, useEffect } from 'react';
import { DotsLoader } from './AppLayout';

export default function Products() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const skip = (page - 1) * limit;
        const response = await fetch(`http://localhost:8000/products?limit=${limit}&skip=${skip}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        <div>Error: {error.message}</div>
      </div>
    );


  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>🛍️ Products</h1>

        {data?.products?.map((product) => (
          <div key={product.id} style={styles.card}>
            <img
              src={product.thumbnail}
              alt={product.title}
              style={styles.image}
            />
            <div style={styles.info}>
              <h3 style={styles.productTitle}>{product.title}</h3>
              <p style={styles.desc}>{product.description}</p>
              <div style={styles.details}>
                <span><b>💲Price:</b> ${product.price}</span>
                <span><b>⭐ Rating:</b> {product.rating}</span>
                <span><b>🏷️ Category:</b> {product.category}</span>
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

const styles = {
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
    textShadow: "#000000ff 0px 0px 4px"
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
    width: "200px",
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