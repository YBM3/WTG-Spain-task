import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(title, date);
    setTitle("");
    setDate(new Date());
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
          placeholder="Task title"
        />
      </div>
      <div className="mb-3">
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          className="form-control"
        />
      </div>
      <button type="submit" disabled={!title} className="btn btn-primary">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
