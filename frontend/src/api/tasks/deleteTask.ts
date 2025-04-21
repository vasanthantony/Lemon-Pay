// src/api/tasks/deleteTask.ts

import axiosInstance from "../lib/axios";


export const deleteTask = async (id: number) => {
  const response = await axiosInstance.delete(`/tasks/${id}`);
  return response.data;
};
