import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [quote, setQuote] = useState("");
const [author, setAuthor] = useState("");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
async function getQuote() {
  const response = await fetch("https://dummyjson.com/quotes/random");
  const data = await response.json();

  setQuote(data.quote);
setAuthor(data.author);
}
useEffect(() => {
  getQuote();
}, []);

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
      
<div>
  <p>{quote}</p>
  <p>— {author}</p>
</div>
<button onClick={getQuote}>New Quote</button>
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
    <Task
    text={task.text}
    completed={task.completed}
    onComplete={completeTask}
    id={task.id}
    key={task.id}
  />
  ))}

      </div>
    </div>
  );
}
 function Task(props) {
  return (
  <p completed={props.completed ? "completed" : ""} > 
  {props.text}
  
  </p>)
  ;
}

export default App;