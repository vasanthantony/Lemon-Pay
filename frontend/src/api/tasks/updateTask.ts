// src/api/tasks/updateTask.ts

import axiosInstance from "../lib/axios";


interface UpdateTaskPayload {
    dueDate: string;
    taskName: string;
    description: string;
}

export const updateTask = async (id: number, data: UpdateTaskPayload) => {
  const response = await axiosInstance.put(`/tasks/${id}`, data);
  return response.data;
};
