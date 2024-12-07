import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ErrCallbackType,
  LoginParams,
  RegisterParams,
  UserContextType,
  UserDataType,
} from "./types";
import authApi from "../api/auth";

const defaultProvider: UserContextType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  token: null,
  registerUser: () => Promise.resolve(),
  isLoggedIn: () => false,
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>(defaultProvider);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserDataType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Retrieve user and token from localStorage on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = async (
    params: LoginParams,
    errorCallback?: ErrCallbackType
  ) => {
    try {
      const response = await authApi.login(params);
      setUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/home");
    } catch (err) {
      if (err instanceof Error) {
        console.error("Login failed:", err.message);
        errorCallback?.({ message: err.message });
      } else {
        console.error("An unexpected error occurred:", err);
        errorCallback?.({ message: "An unexpected error occurred." });
      }
    }
  };

  const handleRegister = async (
    params: RegisterParams,
    errorCallback?: ErrCallbackType
  ) => {
    try {
      const response = await authApi.register(params);
      // Assuming registration is successful and redirects to login
      console.log("Registration successful:", response?.message);
      navigate("/login");
    } catch (err) {
      if (err instanceof Error) {
        console.error("Registration failed:", err.message);
        errorCallback?.({ message: err.message });
      } else {
        console.error("An unexpected error occurred:", err);
        errorCallback?.({ message: "An unexpected error occurred." });
      }
    }
  };

  const isLoggedIn = () => !!user;

  const handleLogout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");
  };

  const values: UserContextType = {
    user,
    token,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    registerUser: handleRegister,
    logout: handleLogout,
    isLoggedIn,
  };

  return (
    <UserContext.Provider value={values}>
      {!loading ? children : <div>Loading...</div>}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => React.useContext(UserContext);
