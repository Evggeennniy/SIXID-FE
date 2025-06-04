import { useSelector } from "react-redux";
import CalendarDayCell from "./CalendarDayCell";
import { selectTodosAllItems } from "../../../../redux/slice/todos/todosSlice";
export default function CalendarGrid({ days, today, deadlineMap }) {
  const items = useSelector(selectTodosAllItems);

  return (
    <div className='grid grid-cols-7 gap-2 text-center sm:gap-2 gap-[1px] text-xs sm:text-sm'>
      {days.map((day, index) => {
        const dateStr = day.date.toDateString();
        const isToday = dateStr === today.toDateString();
        const taskIds = deadlineMap[dateStr] || [];

        const tasks = taskIds
          .map((id) => items?.find((item) => item.id === id))
          .filter(Boolean);

        return (
          <CalendarDayCell
            key={index}
            day={day}
            isToday={isToday}
            tasks={tasks}
          />
        );
      })}
    </div>
  );
}
