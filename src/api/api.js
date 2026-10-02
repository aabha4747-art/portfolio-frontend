import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://portfolio-cms-backend-3yrq.onrender.com/api",
  timeout: 15000,
});

export default api;