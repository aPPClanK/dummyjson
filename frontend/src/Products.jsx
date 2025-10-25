import React, { useState, useEffect } from 'react';

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "20px",
          fontFamily: "sans-serif"
        }}
      >
        Loading data...
      </div>
    );

  if (error)
    return (
      <div
        style={{
          color: "red",
          textAlign: "center",
          marginTop: "50px",
          fontSize: "18px",
          fontFamily: "sans-serif"
        }}
      >
        Error: {error.message}
      </div>
    );


  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Products</h1>
      {data?.products?.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>
            <b>Price:</b> ${product.price}
          </p>
          <p>
            <b>Rating:</b> ⭐ {product.rating}
          </p>
          <p>
            <b>Category:</b> {product.category}
          </p>
        </div>
      ))}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          ⬅️ Назад
        </button>
        <span style={{ margin: "0 10px" }}>Стр.
          <input
            type="text"
            value={page}
            onChange={(e) => setPage(Number(e.target.value))}
            style={{
              width: "20px",
              marginLeft: "8px",
              textAlign: "center",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "3px",
            }}
          />
        </span>
        <button onClick={() => setPage(page + 1)}>Вперёд ➡️</button>
      </div>
    </div>
  );
}