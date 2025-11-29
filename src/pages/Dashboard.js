import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { apiGet, apiPost, apiPut, apiDelete } from "../api";

export default function Tasks() {
  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Edit Modal States
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  async function loadTasks() {
    const data = await apiGet("/tasks", token);
    setTasks(data);
  }

  const addTask = async (e) => {
    e.preventDefault();
    await apiPost("/tasks", { title, description: desc }, token);
    setTitle("");
    setDesc("");
    loadTasks();
  };

  const toggleComplete = async (task) => {
    await apiPut(`/tasks/${task._id}`, { ...task, completed: !task.completed }, token);
    loadTasks();
  };

  const deleteTask = async (id) => {
    await apiDelete(`/tasks/${id}`, token);
    loadTasks();
  };

  // ------------------------
  // Edit Modal Handler
  // ------------------------
  const openEditModal = (task) => {
    setEditId(task._id);
    setEditTitle(task.title);
    setEditDesc(task.description);
    setEditOpen(true);
  };

  const updateTask = async (e) => {
    e.preventDefault();

    await apiPut(
      `/tasks/${editId}`,
      { title: editTitle, description: editDesc },
      token
    );

    setEditOpen(false);
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const filteredTasks = tasks
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => {
      if (filter === "completed") return t.completed;
      if (filter === "pending") return !t.completed;
      return true;
    });

  return (
    <div>
      <Navbar />

      <div className="p-6 max-w-5xl mx-auto">

        <h2 className="text-3xl font-bold mb-4">Your Tasks</h2>

        {/* Add Task */}
        <form onSubmit={addTask} className="mb-6 grid grid-cols-3 gap-3">
          <input
            className="p-2 border rounded"
            placeholder="Task title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <input
            className="p-2 border rounded"
            placeholder="Task description"
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />

          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Add Task
          </button>
        </form>

        {/* Search + Filter */}
        <div className="flex justify-between mb-4">
          <input
            className="p-2 border rounded w-1/2"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="p-2 border rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Task Table */}
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Title</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTasks.map(task => (
              <tr key={task._id} className="text-center">
                <td className="border p-2 font-semibold">
                  {task.completed ? <s>{task.title}</s> : task.title}
                </td>

                <td className="border p-2 text-gray-600">
                  {task.description}
                </td>

                <td className="border p-2">
                  {task.completed ? (
                    <span className="text-green-600 font-bold">Completed</span>
                  ) : (
                    <span className="text-red-600 font-bold">Pending</span>
                  )}
                </td>

                <td className="border p-2 space-x-2">

                  <button
                    onClick={() => openEditModal(task)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => toggleComplete(task)}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    {task.completed ? "Undo" : "Done"}
                  </button>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {/* ---------------------- */}
      {/*   EDIT MODAL POPUP     */}
      {/* ---------------------- */}
      {editOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>

            <form onSubmit={updateTask}>
              <input
                className="w-full p-2 border rounded mb-2"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                required
              />

              <input
                className="w-full p-2 border rounded mb-4"
                value={editDesc}
                onChange={e => setEditDesc(e.target.value)}
              />

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="bg-gray-400 px-4 py-2 text-white rounded"
                >
                  Cancel
                </button>

                <button
                  className="bg-blue-600 px-4 py-2 text-white rounded"
                >
                  Update
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
