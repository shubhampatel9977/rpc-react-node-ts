import { useEffect, useState } from "react";

type TaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { taskName: string; taskDesc: string }) => void;
  initialData?: { taskName: string; taskDesc: string };
  mode: "add" | "edit";
};

export default function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
}: TaskModalProps) {
  const [taskName, setTaskName] = useState<string>("");
  const [taskDesc, setTaskDesc] = useState<string>("");

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setTaskName(initialData.taskName);
      setTaskDesc(initialData.taskDesc);
    } else {
      setTaskName("");
      setTaskDesc("");
    }
  }, [isOpen, mode, initialData]);

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ taskName, taskDesc });
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          {mode === "add" ? "Add Task" : "Edit Task"}
        </h2>

        <form onSubmit={formHandler}>
          {/* Task Name */}
          <label className="text-sm text-gray-600">Task Name*</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg mt-1 mb-4 focus:outline-blue-500"
            placeholder="Enter task name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />

          {/* Task Description */}
          <label className="text-sm text-gray-600">Task Description</label>
          <textarea
            className="w-full p-2 border rounded-lg mt-1 mb-4 focus:outline-blue-500"
            placeholder="Enter description"
            rows={3}
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
          />

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-2">
            <button
              className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 cursor-pointer"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              type="submit"
            >
              {mode === "add" ? "Add" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
