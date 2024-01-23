import React from "react";
import Task from "../Task";
import "bootstrap/dist/css/bootstrap.min.css";

const TaskList = ({ tasks, deleteTask, toggleTask, editTask }) => (
  <div className="list-group">
    {tasks.map((task) => (
      <Task
        key={task.id}
        task={task}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        editTask={editTask}
        className="list-group-item"
      />
    ))}
  </div>
);

export default TaskList;
