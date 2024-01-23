import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";

const localizer = momentLocalizer(moment);

const Calendar = ({ tasks }) => {
  const events = tasks.map((task) => ({
    title: task.title,
    start: task.date,
    end: task.date,
    allDay: true,
  }));

  return (
    <div style={{ height: 500 }} className="mt-3">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};

export default Calendar;
