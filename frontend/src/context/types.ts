import { RESOURCESTATUS, RESOURCETYPE } from "../api/enum";
import { Allocation } from "../api/types";

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
export type RequestParams = {
  resource_type: RESOURCETYPE;
  quantity: number;
  reason: string;
  timeUsage: string;
  user_id: number;
  created_at: string;
  request_id: string;
  status_request: string;
  start_time: string;
  end_time: string;
  updated_at: string;
};

export type ResourceParams = {
  resourceId: number;
  resourceType: RESOURCETYPE;
  quantity: number;
  statusResources: RESOURCESTATUS;
  allocations: Allocation;
  timeUsage: string;
  user_id: number;
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
