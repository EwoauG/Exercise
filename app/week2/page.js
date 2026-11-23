import tasks from "./Week2";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          To-Do-List
        </h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            className="flex-1 px-4 py-2.5 text-sm border border-blue-500 rounded-md outline-none focus:ring-2 focus:ring-blue-200 text-gray-700 placeholder-gray-400"
            placeholder="Mau ngerjain apa hari ini?"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md text-sm font-medium transition-colors">
            Tambah
          </button>
        </div>

        <ul className="flex flex-col gap-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-md border border-gray-100"
            >
              <div className="flex flex-col gap-1 pr-3">
                <span className="text-sm font-semibold text-gray-800">
                  {task.title}
                </span>
                <span className="text-xs text-gray-600">
                  {task.description}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] text-gray-400">
                    {task.date} • {task.time}
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

              <button className="text-red-600 hover:text-red-800 text-sm font-semibold transition-colors shrink-0">
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
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
