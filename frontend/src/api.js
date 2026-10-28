let base = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://parliament-portal-backend.onrender.com"
).replace(/\/+$/, "");

if (typeof window !== "undefined" && window.location?.hostname) {
  const host = window.location.hostname;
  if (host !== "localhost" && host !== "127.0.0.1" && (base.includes("127.0.0.1") || base.includes("localhost"))) {
    base = `${window.location.protocol}//${host}:8000`;
  }
}

const API_BASE_URL = base;

export default API_BASE_URL;
