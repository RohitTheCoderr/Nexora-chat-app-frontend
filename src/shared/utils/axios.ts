import { useAuthStore } from "@/features/sign-in/store/authStore.ts";
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        console.log("Unauthorized");

        useAuthStore.getState().logout();

        // Optional:
        window.location.href = "/sign-in";
      }

      if (status === 403) {
        console.log("Forbidden");
      }

      if (status === 404) {
        console.log("Resource not found");
      }

      if (status >= 500) {
        console.log("Server error");
      }
    } else if (error.request) {
      console.log("Server is not responding");
    } else {
      console.log("Request error:", error.message);
    }

    return Promise.reject(error);
  },
);

export default api;
