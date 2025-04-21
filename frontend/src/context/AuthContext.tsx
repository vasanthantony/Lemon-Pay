import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axiosInstance from "../api/lib/axios";
import { useNavigate } from "react-router-dom";


interface User {
  id: string;
  name?: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  // ✅ Load user from the server when app loads
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("getme", window.location.pathname)
        const response = await axiosInstance.get("/auth/me");
        setUser(response.data); // Store the user data in context
        navigate("/taskmanager");
      } catch (error) {
        console.error("Error fetching user from /me endpoint", error);
        setUser(null); // If the user is not authenticated, reset
      }
    };

    fetchUser(); // Call the /me route
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
