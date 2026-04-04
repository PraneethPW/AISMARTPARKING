import axios from "axios";

function apiBaseUrl(): string {
  const env = import.meta.env.VITE_API_URL as string | undefined;
  if (env && env.trim()) return env.trim();
  if (import.meta.env.DEV) return "";
  return "http://localhost:8000";
}

const api = axios.create({ baseURL: apiBaseUrl() });

api.interceptors.request.use((config) => {
  const url = config.url ?? "";
  const publicPaths = ["/auth/login/json", "/auth/register", "/slots/public", "/health"];
  const isPublic = publicPaths.some((p) => url.includes(p));

  const token = localStorage.getItem("token");
  if (token && config.headers && !isPublic) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

export default api;
