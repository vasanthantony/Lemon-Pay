// src/api/tasks/createTask.ts

import axiosInstance from "../lib/axios";


interface CreateTaskPayload {
  dueDate: string;
  taskName: string;
  description: string;
}

export const createTask = async (data: CreateTaskPayload) => {
  const response = await axiosInstance.post("/tasks", data);
  return response.data;
};
