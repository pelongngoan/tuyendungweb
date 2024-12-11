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
import { Alert, Snackbar } from "@mui/material";

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
  alert: false,
  setAlert: () => false,
  alertInfo: {
    message: "",
    severity: "info",
  },
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>(defaultProvider);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserDataType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [alert, setAlert] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<
    | { message: string; severity: "success" | "error" | "info" | "warning" }
    | undefined
  >(undefined);

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
      setAlertInfo({ message: "Đăng nhập thành công!", severity: "success" });
      navigate("/home");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setAlertInfo({
        message: `Đăng nhập thất bại: ${errorMessage}`,
        severity: "error",
      });
      errorCallback?.({ message: errorMessage });
    }
  };

  const handleRegister = async (
    params: RegisterParams,
    errorCallback?: ErrCallbackType
  ) => {
    try {
      await authApi.register(params);
      setAlertInfo({
        message: "Đăng ký tài khoản thành công",
        severity: "success",
      });
      navigate("/login");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Tài khoản này đã tồn tại";
      setAlertInfo({ message: errorMessage, severity: "error" });
      errorCallback?.({ message: errorMessage });
    }
  };

  const isLoggedIn = () => !!user;

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAlertInfo({ message: "Đăng xuất thành công.", severity: "info" });
    navigate("/login");
  };

  const handleCloseAlert = () => {
    setAlertInfo(undefined);
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
    alert,
    setAlert,
    alertInfo: alertInfo,
  };

  return (
    <>
      <Snackbar
        open={alert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {alertInfo && (
          <Alert severity={alertInfo.severity} onClose={handleCloseAlert}>
            {alertInfo.message}
          </Alert>
        )}
      </Snackbar>
      <UserContext.Provider value={values}>
        {!loading ? children : <div>Loading...</div>}
      </UserContext.Provider>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => React.useContext(UserContext);
