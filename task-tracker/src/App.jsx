import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  function saveTasks(updatedTasks) {
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  function addTask() {
    if (task.trim() === "") {
      alert("Please enter a task");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    saveTasks([...tasks, newTask]);
    setTask("");
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter(task => task.id !== id);
    saveTasks(updatedTasks);
  }

  function completeTask(id) {
    const updatedTasks = tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );

    saveTasks(updatedTasks);
  }

  return (
    <div className="app">
      <h1>AYMAN'S TASK TRACKER</h1>

      <input
        type="text"
        placeholder="Type a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask();
          }
        }}
      />

      <button onClick={addTask}>Add Task</button>

      <div className="task-list">
        {tasks.map(task => (
          <div className="task" key={task.id}>
            <span
              className={task.completed ? "completed" : ""}
              onClick={() => completeTask(task.id)}
            >
              {task.text}
            </span>

            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;