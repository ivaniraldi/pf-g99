import { createContext, useState } from "react";
import { usersMock } from "../libs/dataMock";


const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const login = (userData) => {
    console.log("login con estos datos: ", userData);
    let mockUser = usersMock[1]
    localStorage.setItem("user", JSON.stringify(mockUser));
    setUser(mockUser);
  }

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  }

  const register = (userData) => {
    // Simular el registro de un nuevo usuario
    login(userData);
  }

  return (
    <GlobalContext.Provider value={{ user, login, logout, register }}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };