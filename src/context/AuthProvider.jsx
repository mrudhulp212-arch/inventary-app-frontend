// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null means not logged in
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(true);

  useEffect(()=>{
    // console.log("AuthProvider mounted, checking localStorage for user info...");

    // Check localStorage for user info on mount
    const storedUser = localStorage.getItem("token"); // or "user" if you saved user info
      if (storedUser) {
        const decodedToken = jwtDecode(storedUser);
        setUser(decodedToken); // set user from localStorage
        // console.log("Found user info in localStorage:", decodedToken);
    }
    setIsLoading(false); // done checking
  },[])

  const login = (userData) => {
    setUser(userData); // you can save token here if needed
    navigate("/dashboard"); // redirect after login
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token"); // clear token from localStorage
    navigate("/login"); // redirect after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isloading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier access
export const useAuth = () => useContext(AuthContext);