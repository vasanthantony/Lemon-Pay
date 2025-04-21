import React, { useEffect, useState } from "react";
import TaskModal from "../modal/TaskModal";
import { getTasks } from "../api/tasks/getTasks";
import { updateTask } from "../api/tasks/updateTask";
import { createTask } from "../api/tasks/createTask";
import { deleteTask } from "../api/tasks/deleteTask";

interface Task {
  id: number;
  taskName: string;
  description: string;
  dueDate: string;
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [dropdownId, setDropdownId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const openAddModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleTaskSubmit = async (data: Omit<Task, "id">, id?: number) => {
    try {
      if (id) {
        await updateTask(id, data);
      } else {
        await createTask(data);
      }
      await fetchTasks();
      closeModal();
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      await fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  useEffect(() => {
    // Replace with real API call in production
    setTasks([
      {
        id: 1,
        dueDate: "2025-04-22T08:00:00.000Z",
        taskName: "Design Navaratri poster",
        description: "Create an eye-catching poster for Navaratri event.",
      },
      {
        id: 2,
        dueDate: "2025-04-23T14:00:00.000Z",
        taskName: "Team Meeting",
        description: "Weekly sync-up with the development team.",
      },
    ]);
    setTotalPages(1);
  }, [page]);

  const fetchTasks = async () => {
    try {
      const data = await getTasks(page);
      setTasks(data.tasks);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-white">
        <div className="p-6 flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-[#1939B7]">Tasks Management</h2>
            <button
              className="bg-[#1939B7] text-white px-5 py-2 rounded-full font-semibold"
              onClick={openAddModal}
            >
              + Add Task
            </button>
          </div>

          <table className="w-full text-left table-auto border-separate border-spacing-y-3">
            <thead>
              <tr className="text-[#1939B7] font-medium">
                <th>No</th>
                <th>Date & Time</th>
                <th>Task</th>
                <th>Description</th>
                <th className="text-right pr-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task.id} className="bg-white shadow-md rounded-md text-sm">
                  <td className="p-4">{index + 1 + (page - 1) * 10}</td>
                  <td>{new Date(task.dueDate).toLocaleString()}</td>
                  <td>{task.taskName}</td>
                  <td>{task.description}</td>
                  <td className="text-right relative pr-4">
                    <button onClick={() => setDropdownId(dropdownId === task.id ? null : task.id)}>⋮</button>
                    {dropdownId === task.id && (
                      <div className="absolute right-0 mt-2 w-24 bg-white shadow-lg rounded p-2 text-sm">
                        <button
                          onClick={() => openEditModal(task)}
                          className="block w-full text-left py-1 hover:bg-gray-100"
                        >
                          ✓ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="block w-full text-left py-1 hover:bg-gray-100 text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-auto mb-6 space-x-2 text-sm">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-2 py-1 rounded border hover:bg-gray-100"
          >
            ‹
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setPage(idx + 1)}
              className={`px-2 py-1 rounded ${
                page === idx + 1 ? "bg-[#1939B7] text-white" : "hover:bg-gray-100"
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-2 py-1 rounded border hover:bg-gray-100"
          >
            ›
          </button>
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleTaskSubmit}
        task={selectedTask}
      />
    </>
  );
};

export default TaskManager;
