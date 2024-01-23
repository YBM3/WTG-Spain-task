const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

let tasks = [];

app.get("/tasks", (req, res) => {
  res.send(tasks);
});

app.post("/tasks", (req, res) => {
  const task = req.body;
  tasks.push(task);
  res.send(task);
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log("Deleting task with id:", id);
  console.log("Current tasks:", tasks);
  const taskIndex = tasks.findIndex((task) => task.id === Number(id));

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.send({ message: "Task deleted" });
  } else {
    res.status(404).send({ message: "Task not found" });
  }
});

app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedTask = req.body;

  let task = tasks.find((task) => task.id === id);

  if (task) {
    task.title = updatedTask.title;
    task.done = updatedTask.done;
    res.send(task);
  } else {
    res.status(404).send({ message: "Task not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
