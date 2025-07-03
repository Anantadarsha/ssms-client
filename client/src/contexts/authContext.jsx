import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
  const [token, setToken] = useState(
    localStorage.getItem("token") || sessionStorage.getItem("token")
  );

  useEffect(() => {
    //if something changes in storage, call handleStorage
    window.addEventListener("storage", handleStorage);

    //cleanup event listener if component unmounts
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  //set token
  const handleStorage = () => {
    setToken(localStorage.getItem("token") || sessionStorage.getItem("token"));
  };

  const login = (token, remember) => {
    console.log(remember)
    if(remember) {
        localStorage.setItem("token", token);
    } else {
        sessionStorage.setItem("token", token);
    }

    setToken(token);

  };

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{token, login, logout}}>
        {children}
    </AuthContext.Provider>
  )

};

export const useAuth = () => useContext(AuthContext);
