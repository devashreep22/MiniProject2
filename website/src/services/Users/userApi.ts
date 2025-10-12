import axios from "axios";

export interface User {
  id: string;
  username: string;
  email?: string;
  role: "buyer" | "admin" | "farmer";
  fullName?: string;
  mobileNo?: string;
  isActive?: boolean;
  isVerified?: boolean;
  createdAt?: string;
}

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Get auth header from localStorage token
export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Create axios instance with common config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Fetch all users
export const getUsers = async (): Promise<User[]> => {
  const res = await api.get("/api/v1/admin/get-users");
  return (
    res.data.data.users?.map((u: any) => ({
      ...u,
      id: u._id,
    })) || []
  );
};

// Verify a farmer
export const verifyFarmer = async (id: string): Promise<User> => {
  const res = await api.patch(`/api/v1/admin/verify-farmer/${id}`);
  return { ...res.data.data.user, id: res.data.data.user._id };
};

// Activate / Deactivate any user
export const toggleActive = async (id: string): Promise<User> => {
  const res = await api.patch(`/api/v1/admin/toggle-active/${id}`);
  return { ...res.data.data.user, id: res.data.data.user._id };
};