import { useEffect, useState } from "react";
import { getUsers, verifyFarmer, toggleActive, type User } from "./userApi";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch users");
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyFarmer = async (id: string) => {
    try {
      const updatedUser = await verifyFarmer(id);
      setUsers((prev) => prev.map((u) => (u.id === id ? updatedUser : u)));
      return { success: true };
    } catch (err: any) {
      console.error("Failed to verify farmer:", err);
      return { 
        success: false, 
        error: err.response?.data?.message || "Failed to verify farmer" 
      };
    }
  };

  const handleToggleActive = async (id: string) => {
    try {
      const updatedUser = await toggleActive(id);
      setUsers((prev) => prev.map((u) => (u.id === id ? updatedUser : u)));
      return { success: true };
    } catch (err: any) {
      console.error("Failed to toggle active:", err);
      return { 
        success: false, 
        error: err.response?.data?.message || "Failed to update user status" 
      };
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    handleVerifyFarmer,
    handleToggleActive,
  };
};