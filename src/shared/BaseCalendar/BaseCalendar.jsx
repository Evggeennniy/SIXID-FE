import { useState } from "react";

const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function getMonthDays(year, month) {
  const result = [];
  const date = new Date(year, month, 1);
  const firstDayIndex = (date.getDay() + 6) % 7; // Monday-start week

  const prevMonthDays = firstDayIndex;
  const lastDateOfPrevMonth = new Date(year, month, 0).getDate();

  for (let i = prevMonthDays - 1; i >= 0; i--) {
    const day = lastDateOfPrevMonth - i;
    const d = new Date(year, month - 1, day);
    result.push({ dayNumber: d.getDate(), currentMonth: false, date: d });
  }

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(year, month, i);
    result.push({ dayNumber: i, currentMonth: true, date: d });
  }

  const nextDays = 42 - result.length;
  for (let i = 1; i <= nextDays; i++) {
    const d = new Date(year, month + 1, i);
    result.push({ dayNumber: i, currentMonth: false, date: d });
  }

  return result;
}

export default function BaseCalendar({
  highlightDate,
  highlightColor = "#FFA500",
  onDateClick,
  labelProvider = (date) => `День ${date.getDate()}`,
}) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const days = getMonthDays(currentYear, currentMonth);

  const isSameDay = (d1, d2) =>
    d1 &&
    d2 &&
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear((prev) => prev - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((prev) => prev + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  return (
    <div
      className='mx-auto p-4'
      style={{ maxWidth: 400 }}
      aria-label='Календарь'
      role='application'
    >
      {/* Navigation */}
      <div className='flex justify-between items-center mb-2'>
        <button
          onClick={prevMonth}
          className='px-3 py-1 rounded border border-[#DBDAF0] hover:opacity-60 focus:outline-none focus:ring'
          aria-label='Предыдущий месяц'
        >
          &lt;
        </button>
        <h5 className='font-semibold'>
          {new Date(currentYear, currentMonth).toLocaleDateString("ru-RU", {
            month: "long",
            year: "numeric",
          })}
        </h5>
        <button
          onClick={nextMonth}
          className='px-3 py-1 rounded border border-[#DBDAF0] hover:opacity-60 focus:outline-none focus:ring'
          aria-label='Следующий месяц'
        >
          &gt;
        </button>
      </div>

      {/* Days of the week */}
      <div className='grid grid-cols-7 text-center text-xs md:text-sm font-medium text-[#5E5E5E] select-none'>
        {daysOfWeek.map((day, index) => (
          <div
            key={day}
            className={`py-1 flex justify-center items-center ${
              (index + 1) % 7 !== 0 ? "border-r border-[#DBDAF0]" : ""
            } border-b border-[#DBDAF0]`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className='grid grid-cols-7 gap-0.5'>
        {days.map(({ dayNumber, currentMonth: isCurrent, date }, idx) => {
          const isToday = isSameDay(date, today);
          const isHighlighted = isSameDay(date, highlightDate);

          const todayClass = isToday
            ? "bg-[#A4A4A4] text-[#EFF7FF] font-bold"
            : "";

          const otherMonthClass = !isCurrent
            ? "text-[#A4A4A4] opacity-60"
            : date < today &&
              date.getMonth() === today.getMonth() &&
              date.getFullYear() === today.getFullYear()
            ? "text-[#989898]"
            : "text-[#5E5E5E]";

          return (
            <button
              key={idx}
              onClick={() => onDateClick(date)}
              className={`py-1 rounded text-xs md:text-sm focus:outline-none
                flex items-center justify-center
                hover:bg-[#DBDAF0] ${todayClass} ${otherMonthClass}`}
              style={{
                background: isHighlighted ? highlightColor : undefined,
                color: isHighlighted ? "#fff" : undefined,
                fontWeight: isHighlighted ? "bold" : undefined,
              }}
              aria-label={labelProvider(date)}
              type='button'
            >
              {dayNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
}
