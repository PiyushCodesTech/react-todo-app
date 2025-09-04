import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IoTrashBin } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";

const TodoApp = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState("");

  // Add Todo
  const addTodo = () => {
    if (task.trim() === "") return;
    setTodos([...todos, { id: uuidv4(), task, isComplete: false }]);
    setTask("");
  };

  // Delete Todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Start Editing
  const startEditing = (id, currentTask) => {
    setEditId(id);
    setEditTask(currentTask);
  };

  // Save Edited Todo
  const saveTodo = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, task: editTask } : todo))
    );
    setEditId(null);
    setEditTask("");
  };

  return (
   <div>
  {/* Header Section */}
  <div className="bg-[url('assets/mountain_med.jpg')] md:bg-[url('assets/mountain.jpg')] h-[45vh] md:h-[20vh] bg-cover bg-center flex flex-col justify-center items-center gap-6 px-4">
    <h1 className="md:text-black font-extrabold text-2xl md:text-4xl text-center text-white">
      T A S K A R O O
    </h1>

    <div className="flex flex-wrap justify-center gap-4 md:gap-10 w-full max-w-3xl">
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        type="text"
        placeholder="Add a new task..."
        className="bg-white border border-white rounded-md h-12 w-full sm:w-[70%] px-4 py-2"
      />

      <button
        onClick={addTodo}
        className="rounded-md bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 w-full sm:w-auto"
      >
        Add Task
      </button>
    </div>
  </div>

  {/* Todo List Section */}
  <div className="p-6 flex flex-col items-center">
    <ul className="space-y-2 w-full max-w-3xl px-4">
      {todos.map((item) => (
        <li
          key={item.id}
          className="bg-gray-200 text-black p-3 rounded-md shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2"
        >
          {editId === item.id ? (
            <input
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
              className="border rounded p-2 flex-1"
            />
          ) : (
            <span className="flex-1">{item.task}</span>
          )}

          <div className="flex gap-2 justify-end">
            {editId === item.id ? (
              <button
                onClick={() => saveTodo(item.id)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500"
              >
                Save
              </button>
            ) : (
              <FiEdit
                onClick={() => startEditing(item.id, item.task)}
                className="text-xl cursor-pointer hover:scale-110 hover:shadow-lg border rounded border-gray-300"
              />
            )}

            <IoTrashBin
              onClick={() => deleteTodo(item.id)}
              className="text-xl cursor-pointer hover:scale-110 hover:shadow-lg border rounded border-gray-300"
            />
          </div>
        </li>
      ))}
    </ul>
  </div>
</div>
  );
};

export default TodoApp;