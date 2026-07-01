import { createContext, useState, useEffect } from "react";
import { apiClient as api } from '@ethio-buna/shared';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await api.get("/auth/me");
        setAdmin(data.admin);
      } catch (err) {
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };
    if (localStorage.getItem("token")) checkUser();
    else setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setAdmin(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ admin, setAdmin, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
