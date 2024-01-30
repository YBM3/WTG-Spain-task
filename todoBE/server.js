const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

let tasks = [];
let users = {};

app.post("/register", (req, res) => {
  const email = req.body.email;
  if (users[email]) {
    res.status(400).send({ message: "Email already exists" });
  } else {
    users[email] = { id: Date.now(), email, tasks: [] };
    res.send(users[email]);
  }
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const user = users[email];
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

app.get("/tasks", (req, res) => {
  const user = users[req.query.email];
  if (user) {
    res.send(user.tasks);
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

app.post("/tasks", (req, res) => {
  const email = req.query.email;
  const user = users[email];

  if (user) {
    const task = { id: Date.now(), ...req.body };
    user.tasks.push(task);
    res.send(task);
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const email = req.query.email;
  const user = users[email];

  if (user) {
    const taskIndex = user.tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      user.tasks.splice(taskIndex, 1);
      res.send({ message: "Task deleted" });
    } else {
      res.status(404).send({ message: "Task not found" });
    }
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedTask = req.body;
  const email = req.query.email;
  const user = users[email];

  if (user) {
    let task = user.tasks.find((task) => task.id === id);
    if (task) {
      task.title = updatedTask.title;
      task.done = updatedTask.done;
      res.send(task);
    } else {
      res.status(404).send({ message: "Task not found" });
    }
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
