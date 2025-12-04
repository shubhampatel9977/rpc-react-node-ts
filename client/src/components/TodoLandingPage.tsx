import { useState } from "react";
import { toast } from 'react-toastify';

import { trpc } from "../trpc/client";
import TaskModal from "./TaskModal";
import ConfirmModal from "./ConfirmModal";

type Todo = {
  id: number;
  taskName: string;
  taskDesc: string;
};

const TodoLandingPage = () => {

    const [searchValue, setSearchValue] = useState<string>("");
    const [taskModalOpen, setTaskModalOpen] = useState<boolean>(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
    const [editTask, setEditTask] = useState<Todo | null>(null);
    const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null);

    const { data: getTodos, refetch } = trpc.user.list.useQuery(
        { search: searchValue },
        { enabled: true }
    );

    const createUser = trpc.user.create.useMutation({
        onSuccess: () => {
            refetch();
            toast.success("Task added successfully");
            setTaskModalOpen(false);
        },
        onError: (err) => {
            toast.error(err.message || "Failed to create task");
        },
    });

    const updateUser = trpc.user.update.useMutation({ 
        onSuccess: () => {
            refetch();
            toast.success("Task update successfully");
            setTaskModalOpen(false);
            setEditTask(null);
        },
        onError: (err) => {
            toast.error(err.message || "Failed to update task");
        },
    });
    
    const deleteUser = trpc.user.delete.useMutation({
        onSuccess: () => {
            refetch();
            toast.success("Task deleted successfully");
            setConfirmModalOpen(false);
            setDeleteTaskId(null);
        },
        onError: (err) => {
            toast.error(err.message || "Failed to delete task");
        },
    });

    const openAddModal = () => {
        setTaskModalOpen(true);
    };

    const openEditModal = (task: Todo) => {
        setEditTask(task);
        setTaskModalOpen(true);
    };

    const openDeleteModal = (id: number) => {
        setDeleteTaskId(id);
        setConfirmModalOpen(true)
    }

    const handleSubmit = (data: { taskName: string; taskDesc: string }) => {
        if (editTask) {
            updateUser.mutate({ id: editTask.id, taskName: data.taskName, taskDesc: data.taskDesc })
        } else {
            createUser.mutate({ taskName: data.taskName, taskDesc: data.taskDesc })
        }
    };

    const handleDelete = () => {
        if (!deleteTaskId) return;

        deleteUser.mutate({ id: deleteTaskId });
    };

    return(
        <div className="min-h-screen w-7xl bg-[#F4F6FE] flex flex-col items-center p-6 rounded-2xl">

            {/* HEADER */}
            <h1 className="text-4xl font-bold text-gray-700 mb-6">TODO LIST</h1>

            <div className="flex justify-between w-full">
                <div>
                    <input
                        placeholder="Search"
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="bg-gray-300 rounded-xl px-5 py-2"
                    />
                </div>
                <button
                    onClick={openAddModal}
                    className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition mb-5 cursor-pointer"
                >
                    Add Task
                </button>
            </div>

            {/* LIST */}
            <div className="w-full bg-white rounded-2xl shadow p-5">
                {getTodos?.map((todo) => (
                    <div
                        key={todo.id}
                        className="flex justify-between items-center bg-[#FAFAFF] p-4 rounded-xl mb-3 shadow-sm"
                    >
                        <div>
                            <p className="text-lg font-semibold">{todo.taskName}</p>
                            <p className="text-gray-600 text-sm mt-1">{todo.taskDesc}</p>
                        </div>

                        <div className="flex gap-4">
                            <button
                            onClick={() => openDeleteModal(todo.id)}
                                className="text-gray-500 hover:text-red-500 cursor-pointer"
                                >
                                    Delete
                            </button>

                            <button
                                onClick={() => openEditModal(todo)}
                                className="text-gray-500 hover:text-blue-500 cursor-pointer"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add / Update MODAL */}
            <TaskModal
                isOpen={taskModalOpen}
                onClose={() => setTaskModalOpen(false)}
                onSubmit={handleSubmit}
                initialData={
                editTask
                    ? { taskName: editTask.taskName, taskDesc: editTask.taskDesc }
                    : undefined
                }
                mode={editTask ? "edit" : "add"}
            />

            {/* Delete MODAL */}
            <ConfirmModal
                isOpen={confirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                onSubmit={handleDelete}
            />
        </div>
    )
};

export default TodoLandingPage;
