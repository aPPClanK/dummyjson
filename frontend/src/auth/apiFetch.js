import { refreshToken } from "./auth";

export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem("accessToken");

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let res = await fetch(url, { ...options, headers, credentials: "include" });

  if (res.status === 401) {
    const newToken = await refreshToken();
    if (newToken) {
      headers.Authorization = `Bearer ${newToken}`;
      res = await fetch(url, { ...options, headers, credentials: "include" });
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }
  }

  return res;
}
