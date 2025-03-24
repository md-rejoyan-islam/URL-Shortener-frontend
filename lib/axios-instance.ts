import axios from "axios";

// Base URL for your API (use environment variable in production)
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5080";

// Create an Axios instance (optional, for reusability and configuration)
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
