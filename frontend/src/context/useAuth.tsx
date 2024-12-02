import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ErrCallbackType,
  LoginParams,
  RegisterParams,
  UserContextType,
  UserDataType,
} from "./types";

const defaultProvider: UserContextType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  token: null,
  registerUser: () => Promise.resolve(),
  isLoggedIn: function (): boolean {
    throw new Error("Function not implemented.");
  },
};
type Props = { children: React.ReactNode };
const UserContext = createContext(defaultProvider);
export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
    }
    setIsReady(true);
    console.log(user);
  }, []);

  const handleLogin = (
    params: LoginParams,
    errorCallback?: ErrCallbackType
  ) => {};

  const handleRegister = (
    params: RegisterParams,
    errorCallback?: ErrCallbackType
  ) => {};

  const isLoggedIn = () => {
    return !!user;
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("userData");
    window.localStorage.removeItem("storageTokenKeyName");
    navigate("/login");
  };
  const values = {
    isLoggedIn: isLoggedIn,
    registerUser: handleRegister,
    user,
    token,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
  };
  const generateDummyToken = (username: string): string => {
    const payload = {
      username: username,
      issuedAt: new Date().toISOString(),
      expiry: new Date(Date.now() + 3600 * 1000).toISOString(), // 1-hour expiry
    };

    // Convert payload to a Base64-encoded string
    return btoa(JSON.stringify(payload));
  };

  return (
    <UserContext.Provider value={values}>
      {isReady ? children : null}
    </UserContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => React.useContext(UserContext);
