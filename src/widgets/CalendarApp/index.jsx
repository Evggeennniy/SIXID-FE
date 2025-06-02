import { useState } from "react";

import getMonthDays from "../../util/getMonthDays";
import { useSelector } from "react-redux";
import { selectTodosAllItems } from "../../redux/slice/todos/todosSlice";

function CalendarApp() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [viewMode, setViewMode] = useState("month"); // 'month' or 'week'

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthDays = getMonthDays(year, month);

  const items = useSelector(selectTodosAllItems);

  // Map of deadlines by date string
  const deadlineMap = items.reduce((map, item) => {
    const dateStr = new Date(item.deadline).toDateString();
    map[dateStr] = item.statusOfImportant;
    return map;
  }, {});

  // Split monthDays into weeks
  const weeks = [];
  for (let i = 0; i < monthDays.length; i += 7) {
    weeks.push(monthDays.slice(i, i + 7));
  }

  // Find current week
  const currentWeekIndex = weeks.findIndex((week) =>
    week.some((day) => day.date.toDateString() === currentDate.toDateString())
  );
  const currentWeek = weeks[currentWeekIndex] || [];

  const visibleDays = viewMode === "month" ? monthDays : currentWeek;

  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "month") {
      newDate.setMonth(month - 1);
    } else {
      newDate.setDate(currentDate.getDate() - 7);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "month") {
      newDate.setMonth(month + 1);
    } else {
      newDate.setDate(currentDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  return (
    <div className='p-4 bg-transparent rounded-lg w-full text-[#4A4A4A]'>
      {/* Header */}
      <div className='flex w-full justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold'>Календарь</h2>
        <div className='flex items-center gap-2'>
          <button onClick={handlePrev}>‹</button>
          <span className='font-medium'>
            {monthNames[month]} {year}
          </span>
          <button onClick={handleNext}>›</button>
        </div>
        <div className='space-x-2'>
          <button
            onClick={() => setViewMode("week")}
            className={viewMode === "week" ? "font-bold underline" : ""}
          >
            Неделя
          </button>
          <button
            onClick={() => setViewMode("month")}
            className={viewMode === "month" ? "font-bold underline" : ""}
          >
            Месяц
          </button>
        </div>
      </div>

      {/* Week Days Header */}
      <div className='grid grid-cols-7 text-center text-sm font-medium text-[#4A4A4A] mb-2'>
        {["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"].map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className='grid grid-cols-7 gap-2 text-center'>
        {visibleDays.map((day, index) => {
          const isToday = day.date.toDateString() === today.toDateString();
          const dateStr = day.date.toDateString();
          const importance = deadlineMap[dateStr];

          const bgColor =
            importance === "срочно"
              ? "bg-red-300"
              : importance === "важно"
              ? "bg-green-300"
              : importance === "обычно"
              ? "bg-[#96E3FF]"
              : "bg-white";

          return (
            <div
              key={index}
              className={`p-2 rounded-lg h-[97px] flex items-start justify-start text-sm ${
                !day.currentMonth
                  ? "text-[#4A4A4A] bg-[#FFFFFF] opacity-40"
                  : ""
              } ${
                isToday ? "border-2 border-blue-400 font-bold" : ""
              } ${bgColor}`}
            >
              <span>{day.dayNumber}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarApp;
