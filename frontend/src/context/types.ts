export type ErrCallbackType = (err: { [key: string]: string }) => void;

export type LoginParams = {
  email: string;
  password: string;
  rememberMe?: boolean;
};
export type RegisterParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export type UserDataType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountType: string;
  contact?: string;
  location?: string;
  profileUrl?: string;
  cvUrl?: string;
  jobTitle?: string;
  about?: string;
};

export type UserContextType = {
  loading: boolean;
  setLoading: (value: boolean) => void;
  user: UserDataType | null;
  setUser: (value: UserDataType | null) => void;
  logout: () => void;
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void;
  token: string | null;
  registerUser: (
    params: RegisterParams,
    errorCallback?: ErrCallbackType
  ) => void;
  isLoggedIn: () => boolean;
};
