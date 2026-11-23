"use client";

import { useState, useEffect } from "react";

interface Task {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  completed: boolean;
  status: string;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const tasksJson = localStorage.getItem("tasks");
    if (tasksJson) {
      const savedTasks: Task[] = JSON.parse(tasksJson);
      setTasks(savedTasks);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, loaded]);

  function addTask() {
    if (!title.trim()) return;

    let maxId = 0;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id > maxId) {
        maxId = tasks[i].id;
      }
    }

    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(now);

    const formattedTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const newTask: Task = {
      id: maxId + 1,
      title: title,
      category: "Pribadi",
      date: formattedDate,
      time: formattedTime,
      completed: false,
      status: "belum selesai",
    };

    setTasks([newTask, ...tasks]);
    setTitle("");
  }

  function completeTask(id: number) {
    setTasks((prevTasks) =>
      prevTasks.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            completed: true,
            status: "selesai",
          };
        }
        return t;
      }),
    );
  }

  function deleteTask(id: number) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  return (
    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        To-Do-List
      </h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          className="flex-1 px-4 py-2.5 text-sm border border-blue-500 rounded-md outline-none focus:ring-2 focus:ring-blue-200 text-gray-700 placeholder-gray-400"
          placeholder="Mau ngerjain apa hari ini?"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md text-sm font-medium transition-colors"
        >
          Tambah
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-center text-sm text-gray-400 py-4">
          Belum ada tugas. Yuk tambah tugas baru!
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-md border border-gray-100"
            >
              <div className="flex flex-col gap-1 pr-3">
                <span
                  className={`text-sm font-semibold ${
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {task.title}
                </span>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-[11px] text-gray-400">
                    {task.date} • {task.time}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">
                    {task.category}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      task.completed
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!task.completed && (
                  <button
                    onClick={() => completeTask(task.id)}
                    title="Tandai Selesai"
                    className="text-green-600 hover:text-green-800 text-xs font-semibold px-2 py-1 rounded bg-green-50 hover:bg-green-100 transition-colors"
                  >
                    Selesai
                  </button>
                )}

                <button
                  onClick={() => deleteTask(task.id)}
                  title="Hapus Tugas"
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
