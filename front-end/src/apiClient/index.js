import axios from "axios";
import { getAuthToken } from "../helper/helper";

const clientUrl="https://online-fruit-shop-khaki.vercel.app/api/"
// const clientUrl='http://localhost:8080/api/'
// const clientUrl='http://3.110.108.218:8080/api'

const apiClient = axios.create({
  baseURL:clientUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding tokens or logging
apiClient.interceptors.request.use(
  (config) => {
    // You can add authentication tokens if needed
    // const token = localStorage.getItem("authToken");
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
