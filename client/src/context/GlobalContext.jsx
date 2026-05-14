import { createContext, useState, useEffect } from "react";
import { usersMock } from "../libs/dataMock";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (userData) => {
    // --- MOCK ---
    console.log("login con estos datos: ", userData);
    let mockUser = usersMock[1]
    localStorage.setItem("user", JSON.stringify(mockUser));
    setUser(mockUser);
    return { success: true };

    // --- API ---
    /*
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Error de conexión" };
    }
    */
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const register = async (userData) => {
    // --- MOCK ---
    login(userData);
    return { success: true };

    // --- API ---
    /*
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Register error:", error);
      return { success: false, message: "Error de conexión" };
    }
    */
  };

  return (
    <GlobalContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };