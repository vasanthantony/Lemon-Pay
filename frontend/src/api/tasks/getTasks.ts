// src/api/tasks/getTasks.ts

import axiosInstance from "../lib/axios";


export const getTasks = async (page: number) => {
  const response = await axiosInstance.get(`/tasks?page=${page}`);
  return response.data;
};
