import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const taskSchema = z.object({
  taskName: z.string().min(1, "Task Name is required"),
  description: z.string().min(1, 'Description is required'),
  dueDate: z.string().min(1, "Due date is required"),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData, id?: number) => Promise<void>; // <-- change this line
  task?: {
    id: number;
    taskName: string;
    description: string;
    dueDate: string;
  } | null;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSubmit, task }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      taskName: "",
      description: "",
      dueDate: "",
    },
  });

  const watchedDueDate = watch("dueDate");
  const dateValue = watchedDueDate ? new Date(watchedDueDate) : null;

  useEffect(() => {
    if (task) {
      reset(task);
      setValue("dueDate", task.dueDate);
    } else {
      reset({ taskName: "", description: "", dueDate: "" });
    }
  }, [task, reset]);

  const submitHandler = (data: TaskFormData) => {
    onSubmit(data, task?.id);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setValue("dueDate", date.toISOString());
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-[400px]">
        <h2 className="text-xl font-semibold text-center mb-4">
          {task ? "Edit Task" : "Add Task"}
        </h2>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div>
            <input
              {...register("taskName")}
              placeholder="Enter Task Name"
              className="w-full border-0 px-3 py-2 rounded bg-[rgba(106,105,105,0.25)]"
            />
            {errors.taskName && <p className="text-sm text-red-500">{errors.taskName.message}</p>}
          </div>
          <div>
            <input
              {...register("description")}
              placeholder="Description"
              className="w-full border-0 px-3 py-2 rounded bg-[rgba(106,105,105,0.25)]"
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </div>

          <div>
            <DatePicker
              selected={dateValue}
              onChange={handleDateChange}
              showTimeSelect
              dateFormat="Pp"
              placeholderText="Select Due Date & Time"
              className="w-full border-0 px-3 py-2 rounded bg-[rgba(106,105,105,0.25)]"
            />
            {errors.dueDate && <p className="text-sm text-red-500">{errors.dueDate.message}</p>}
          </div>

          <div className="flex justify-center mt-4">
            <button type="submit" className="bg-blue-800 text-white px-6 py-2 rounded-full mr-4">
              Save
            </button>
            <button type="button" onClick={onClose} className="text-sm underline">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
