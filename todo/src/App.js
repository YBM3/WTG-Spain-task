import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Calendar from "./components/Calendar";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [email, setEmail] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const API_URL = "http://localhost:5000/tasks";

  const getTasks = async () => {
    if (!email) {
      alert("No email specified");
      return;
    }

    try {
      const response = await fetch(`${API_URL}?email=${email}`);

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
    if (email) {
      getTasks();
    }
  }, [email]);

  const addTask = async (title, date) => {
    if (!email) {
      alert("Please login or register");
      return;
    }

    const newTask = { id: Date.now(), title, date, done: false };
    const response = await fetch(`${API_URL}?email=${email}`, {
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
    const response = await fetch(`${API_URL}/${id}?email=${email}`, {
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

    const response = await fetch(`${API_URL}/${id}?email=${email}`, {
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

    const response = await fetch(`${API_URL}/${id}?email=${email}`, {
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
    <Router>
      <Header currentUser={currentUser} />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <TaskForm addTask={addTask} />
                <TaskList
                  tasks={tasks}
                  deleteTask={deleteTask}
                  toggleTask={toggleTask}
                  editTask={editTask}
                />
                <Calendar
                  tasks={tasks}
                  editTask={editTask}
                  deleteTask={deleteTask}
                  toggleTask={toggleTask}
                />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <RegisterForm
                setEmail={setEmail}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginForm
                email={email}
                setEmail={setEmail}
                setCurrentUser={setCurrentUser}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
