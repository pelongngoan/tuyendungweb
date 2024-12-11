// types.ts or a similar file

export interface UserDataType {
  id: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  location?: string;
  major?: string;
  cn?: string;
  phone?: string;
  role?: "ADMIN" | "USER";
  imageUrl: string;
}

export interface UserContextType {
  user: UserDataType | null;
  token: string | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserDataType | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  login: (
    params: LoginParams,
    errorCallback?: ErrCallbackType
  ) => Promise<void>;
  registerUser: (
    params: RegisterParams,
    errorCallback?: ErrCallbackType
  ) => Promise<void>;
  logout: () => void;
  isLoggedIn: () => boolean;
  alert: boolean;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
  alertInfo:
    | {
        message: string;
        severity: "success" | "error" | "info" | "warning";
      }
    | undefined;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  location?: string;
  major?: string;
  cn?: string;
  phone?: string;
  role?: string;
}

export interface ErrCallbackType {
  (error: { message: string }): void;
}
