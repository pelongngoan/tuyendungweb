import axiosClient from "../axiosClient ";
import { User } from "../types";

const userApi = {
  getUser: async (id: string) => {
    const response = await axiosClient.get(`api-v1/users/get-user/${id}`); // Use the correct path
    return response.data;
  },
  updateUser: async (data: User) => {
    const response = await axiosClient.put("api-v1/users/update-user", data); // Use the correct path
    return response.data;
  },
};

export default userApi;
