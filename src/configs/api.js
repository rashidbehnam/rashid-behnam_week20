import cookies from "js-cookie";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,

  headers: {
    "Content-Type": "Application/JSON",
  },
});
api.interceptors.request.use(
  (config) => {
    const token = cookies.get("jwt-token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default api;
