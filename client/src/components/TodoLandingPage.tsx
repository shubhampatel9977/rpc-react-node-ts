import { useState } from "react";

type Todo = {
  id: number;
  taskName: string;
  taskDesc: string;
};

const TodoLandingPage = () => {

    const [todos] = useState<Todo[]>([
        {
            id: 1,
            taskName: "Create a react project 🤟",
            taskDesc: "5:23 AM, 01/06/2022",
        },
        {
            id: 2,
            taskName: "Learn React ❤️",
            taskDesc: "5:22 AM, 01/06/2022",
        },
        {
            id: 3,
            taskName: "Create a Todo App 🧑‍💻",
            taskDesc: "5:21 AM, 01/06/2022",
        },
    ]);

    return(
        <>
            <div className="w-7xl bg-[#F4F6FE] flex flex-col items-center p-6 rounded-xl">
                {/* <h1 className="text-4xl font-bold text-gray-700 mb-6">TODO LIST</h1> */}

                <div className="w-full flex justify-between mb-4">
                    <input placeholder="Search task" className="rounded-xl bg-gray-300 px-4" />
                    <button className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition cursor-pointer">
                    Add Task
                    </button>
                </div>

                <div className="w-full bg-white rounded-2xl shadow p-5">
                    {todos.map((todo) => (
                    <div
                        key={todo.id}
                        className="flex items-start justify-between bg-[#FAFAFF] p-4 rounded-xl mb-3 shadow-sm"
                    >
                        {/* LEFT SIDE: Text + Date */}
                        <div className="flex flex-col">
                        <span
                            className={`text-lg font-semibold text-gray-700`}
                        >
                            {todo.taskName}
                        </span>

                        <span className="text-sm text-gray-500">{todo.taskDesc}</span>
                        </div>

                        {/* RIGHT SIDE: Icons */}
                        <div className="flex gap-4 mt-1">
                        <button className="text-gray-500 hover:text-red-500 cursor-pointer">
                            Delete
                        </button>

                        <button className="text-gray-500 hover:text-blue-500 cursor-pointer">
                            Edit
                        </button>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </>
    )
};

export default TodoLandingPage;
