export async function refreshToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  try {
    const res = await fetch("https://dummyjson-production-47d6.up.railway.app//auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refreshToken: refreshToken,
        expiresInMins: 30,
      }),
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to refresh token");

    const data = await res.json();

    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
      return data.accessToken;
    }
  } catch (err) {
    console.error("Token refresh error:", err);
    return null;
  }
}
