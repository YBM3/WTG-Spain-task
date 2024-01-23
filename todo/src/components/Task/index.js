import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Task = ({ task, deleteTask, toggleTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  let date = new Date(task.date);
  let dateString = date.toDateString();

  const handleEdit = () => {
    setIsEditing(false);
    editTask(task.id, newTitle);
  };

  return (
    <div className="list-group-item">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="form-control"
          />
          <button onClick={handleEdit} className="btn btn-primary mt-2">
            Save
          </button>
        </div>
      ) : (
        <div className="form-check d-flex justify-content-between align-items-center">
          <div>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
              className="form-check-input"
            />
            <span>
              {task.title} - {dateString}
            </span>
          </div>
          <label className="form-check-label d-flex justify-content-between">
            <div className="btn-group" role="group" aria-label="Basic example">
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-primary mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </label>
        </div>
      )}
    </div>
  );
};

export default Task;
