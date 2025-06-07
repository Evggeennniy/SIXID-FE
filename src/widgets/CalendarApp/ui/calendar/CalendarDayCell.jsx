import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveCalendarDay,
  setActiveCalendarDay,
} from "../../../../redux/slice/calendar/calendarSlice";
import {
  setActiveDayTasks,
  setActiveTodoItem,
} from "../../../../redux/slice/todos/todosSlice";

export default function CalendarDayCell({ day, isToday, tasks = [] }) {
  const dispatch = useDispatch();
  const activeDay = useSelector(selectActiveCalendarDay);

  const getBgColor = (importance) => {
    switch (importance) {
      case "urgent":
        return "bg-red-300";
      case "important":
        return "bg-green-300";
      case "normal":
        return "bg-[#96E3FF]";
      default:
        return "bg-white";
    }
  };

  function handleOnClick() {
    dispatch(setActiveCalendarDay(day.date.toDateString()));
    dispatch(setActiveDayTasks(tasks?.map((item) => item?.id)));

    dispatch(setActiveTodoItem(tasks?.length > 0 ? tasks[0].id : []));
  }

  const isActive = day.date.toDateString() === activeDay;

  return (
    <div
      onClick={handleOnClick}
      className={`
        p-2 rounded-lg flex flex-col items-start justify-start text-sm overflow-hidden
        h-[70px] sm:h-[130px]  shadow-[0_0_10px_rgba(0,0,0,0.2)] cursor-pointer transition-all duration-200
        ${isActive ? " shadow-[#A8A5FF] " : ""}
        ${
          !day.currentMonth
            ? "text-[#A4A4A4] bg-[#FFFFFF] opacity-40"
            : "text-[#4A4A4A] bg-[#FFFFFF] opacity-80"
        }
        ${isToday ? "border-1 border-[#A8A5FF]  font-bold" : ""}
      `}
    >
      <span className='text-[.9375rem] mx-auto sm:mx-0 sm:text-base'>
        {day.dayNumber}
      </span>

      <div className='mt-1 space-y-1 w-full overflow-hidden'>
        {tasks.slice(0, 2).map((task, idx) => (
          <div
            key={idx}
            className='flex items-center gap-[2px] sm:gap-1 sm:p-1 text-[.9rem] sm:text-[.75rem] text-left  overflow-hidden whitespace-nowrap'
          >
            {/* Кружок с цветом приоритета */}
            <div
              className={`w-2.5 h-2.5 mx-auto sm:mx-0  rounded-full shrink-0 ${getBgColor(
                task.priority
              )}`}
            ></div>

            {/* Текст задачи */}
            <div className='overflow-hidden hidden sm:block text-ellipsis'>
              {task.title}
            </div>
          </div>
        ))}
        {tasks.length > 2 && (
          <p className='text-xs text-left text-[#A4A4A4] truncate'>
            еще {tasks.length - 2}...
          </p>
        )}
      </div>
    </div>
  );
}
