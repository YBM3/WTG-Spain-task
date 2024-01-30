import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const localizer = momentLocalizer(moment);

const Calendar = ({ tasks, editTask, deleteTask, toggleTask }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const handleSelectEvent = (event) => {
    setSelectedTask(event);
    setNewTitle(event.title);
    setIsEditing(true);
  };

  const handleEditTask = () => {
    editTask(selectedTask.id, newTitle);
    setIsEditing(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = () => {
    deleteTask(selectedTask.id);
    setSelectedTask(null);
  };

  const events = tasks.map((task) => ({
    id: task.id,
    title: task.title,
    start: task.date,
    end: task.date,
    allDay: true,
    done: task.done,
  }));

  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event.done ? "green" : "lightgrey",
    };
    return {
      style: style,
    };
  };

  return (
    <div style={{ height: 500 }} className="mt-3">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleSelectEvent}
      />

      {selectedTask && (
        <Modal
          show
          onHide={() => {
            setSelectedTask(null);
            setIsEditing(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="form-control"
                />
                <button
                  onClick={handleEditTask}
                  className="btn btn-primary mt-2"
                >
                  Save
                </button>
              </div>
            ) : (
              <span>{selectedTask.title}</span>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteTask}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Calendar;
