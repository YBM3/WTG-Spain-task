import "./App.css";
import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Calendar from "./components/Calendar";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const API_URL = "http://localhost:5000/tasks";

  const getTasks = async () => {
    try {
      const response = await fetch(API_URL);

      if (response.ok) {
        const tasks = await response.json();
        setTasks(tasks);
        console.log(tasks);
      } else {
        console.error("Error getting tasks");
      }
    } catch (error) {
      console.error("Failed to fetch", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = async (title, date) => {
    const newTask = { id: Date.now(), title, date, done: false };
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    if (response.ok) {
      setTasks([...tasks, newTask]);
    } else {
      console.error("Error adding task");
    }
  };

  const deleteTask = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setTasks(tasks.filter((task) => task.id !== Number(id)));
    } else {
      console.error("Error deleting task");
    }
  };

  const toggleTask = async (id) => {
    const taskToToggle = tasks.find((task) => task.id === id);
    const updatedTask = { ...taskToToggle, done: !taskToToggle.done };

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    if (response.ok) {
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    } else {
      console.error("Error toggling task");
    }
  };

  const editTask = async (id, newTitle) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    const updatedTask = { ...taskToEdit, title: newTitle };

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    if (response.ok) {
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    } else {
      console.error("Error editing task");
    }
  };

  return (
    <div className="container">
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        editTask={editTask}
      />
      <Calendar tasks={tasks} />
    </div>
  );
};

export default App;
