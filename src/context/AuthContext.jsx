import { createContext, useContext, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

const readStoredSession = () => {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  if (!storedToken || !storedUser) return { token: null, user: null };
  api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
  return { token: storedToken, user: JSON.parse(storedUser) };
};

export function AuthProvider({ children }) {
  const [{ token, user }, setSession] = useState(readStoredSession);

  const persistSession = ({ token: newToken, user: newUser }) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
    setSession({ token: newToken, user: newUser });
  };

  const register = async ({ name, email, password }) => {
    const { data } = await api.post("/auth/register", { name, email, password });
    persistSession(data);
    return data.user;
  };

  const login = async ({ email, password }) => {
    const { data } = await api.post("/auth/login", { email, password });
    persistSession(data);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.common.Authorization;
    setSession({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
