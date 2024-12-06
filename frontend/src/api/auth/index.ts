import { LoginParams, RegisterParams } from "../../context/types";
import axiosClient from "../axiosClient ";

const authApi = {
  login: async (data: LoginParams) => {
    const response = await axiosClient.post("api-v1/auth/login", data); // Use the correct path
    return response.data;
  },
  register: async (data: RegisterParams) => {
    const response = await axiosClient.post("api-v1/auth/register", data); // Use the correct path
    return response.data;
  },
};

export default authApi;
