import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface User {
  id?: string;
  name: string;
  email: string;
  role: "buyer" | "farmer" | "admin";
  farmName?: string;
  farmAddress?: string;
  cropTypes?: string[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
  token: string | null;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "buyer" | "farmer";
  farmName?: string;
  farmAddress?: string;
  cropTypes?: string[];
}

interface LoginData {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const mockUser: User = {
//   id: "1",
//   name: "Devashree",
//   email: "devashree@gmail.com",
//   role: "buyer",
//   farmName: "MyFarm",
//   farmAddress: "123 Main St, Anytown, USA",
//   cropTypes: ["Wheat", "Corn"],
// }

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // const [user, setUser] = useState<User | null>(mockUser);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  // const [token, setToken] = useState<string | null>("dummy-token");
  const [loading, setLoading] = useState<boolean>(true);

  const api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const register = async (data: RegisterData) => {
    setLoading(true);
    try {
      await api.post("/auth/register", data);
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: LoginData) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", data);
      const { token } = res.data;
      localStorage.setItem("token", token);
      setToken(token);
      await fetchProfile();
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      setUser(null);
      localStorage.removeItem("token");
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    // if(token === "dummy-token") return;
    if (token) {
      fetchProfile();
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, logout, fetchProfile, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
