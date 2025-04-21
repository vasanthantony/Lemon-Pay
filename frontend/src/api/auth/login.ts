// api/auth/login.ts

import axiosInstance from "../lib/axios";


export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export const login = async (data: LoginPayload) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};
