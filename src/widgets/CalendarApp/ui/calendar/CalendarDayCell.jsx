import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveCalendarDay,
  setActiveCalendarDay,
  setActiveDayTasks,
} from "../../../../redux/slice/calendar/calendarSlice";
import { setActiveTodoItem } from "../../../../redux/slice/todos/todosSlice";

export default function CalendarDayCell({ day, isToday, tasks = [] }) {
  const dispatch = useDispatch();
  const activeDay = useSelector(selectActiveCalendarDay);

  const getBgColor = (importance) => {
    switch (importance) {
      case "срочно":
        return "bg-red-300";
      case "важно":
        return "bg-green-300";
      case "обычно":
        return "bg-[#96E3FF]";
      default:
        return "bg-white";
    }
  };

  function handleOnClick() {
    dispatch(setActiveCalendarDay(day.date.toDateString()));
    dispatch(setActiveDayTasks(tasks));
    dispatch(setActiveTodoItem(tasks?.[0]?.id));
  }

  const isActive = day.date.toDateString() === activeDay;

  return (
    <div
      onClick={handleOnClick}
      className={`
        p-2 rounded-lg flex flex-col items-start justify-start text-sm overflow-hidden
        h-auto sm:h-[130px] shadow-[0_0_10px_rgba(0,0,0,0.2)] cursor-pointer transition-all duration-200
        ${isActive ? "ring-2 ring-blue-500 bg-blue-50" : ""}
        ${
          !day.currentMonth
            ? "text-[#A4A4A4] bg-[#FFFFFF] opacity-40"
            : "text-[#4A4A4A] bg-[#FFFFFF] opacity-80"
        }
        ${isToday ? "border-2 border-blue-400 font-bold" : ""}
      `}
    >
      <span className='text-[.9375rem] sm:text-base'>{day.dayNumber}</span>

      <div className='mt-1 space-y-1 w-full overflow-hidden'>
        {tasks.slice(0, 2).map((task, idx) => (
          <div
            key={idx}
            className={`p-1 text-[.65rem] sm:text-[.75rem] text-left border-l ${getBgColor(
              task.statusOfImportant
            )} border-[#A8A5FF] whitespace-nowrap overflow-hidden text-ellipsis`}
          >
            {task.title}
          </div>
        ))}
        {tasks.length > 2 && (
          <p className='text-xs text-left text-gray-500 truncate'>
            еще {tasks.length - 2}...
          </p>
        )}
      </div>
    </div>
  );
}
