// api/auth/signup.ts

import axiosInstance from "../lib/axios";


export interface SignupPayload {
  email: string;
  password: string;
  confirmPassword: string;
  rememberMe?: boolean;
}

export const signup = async (data: SignupPayload) => {
  const response = await axiosInstance.post("/auth/signup", data);
  return response.data;
};
