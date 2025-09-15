import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});

export const register = (payload) => api.post("/register", payload, { headers: { "Content-Type": "application/json" } });
export const login    = (email, password) => api.post("/login",    { email, password });
export const forgotPassword = (email)     => api.post("/forgot-password", { email });
export const resetPassword  = (token, newPassword) =>
  api.post(`/reset-password/${token}`, { newPassword });

export default api;
