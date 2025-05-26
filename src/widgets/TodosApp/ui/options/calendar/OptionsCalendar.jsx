import { useState } from "react";
import getMonthDays from "../../../../../util/getMonthDays";

const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export default function OptionsCalendar() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const days = getMonthDays(currentYear, currentMonth);

  const isToday = (date) => {
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  const handleDateClick = (date) => {
    alert("Вы выбрали дату: " + date.toLocaleDateString("ru-RU"));
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div
      className='mx-auto p-4'
      style={{ maxWidth: 400 }}
      aria-label='Календарь'
      role='application'
    >
      {/* Навигация */}
      <div className='flex justify-between items-center mb-2'>
        <button
          onClick={prevMonth}
          className='px-3 py-1 rounded border flex justify-center items-center border-[#DBDAF0] hover:opacity-60 focus:outline-none focus:ring'
          aria-label='Предыдущий месяц'
          type='button'
        >
          &lt;
        </button>
        <h5 className='flex justify-center items-center font-semibold'>
          {new Date(currentYear, currentMonth).toLocaleDateString("ru-RU", {
            month: "long",
            year: "numeric",
          })}
        </h5>
        <button
          onClick={nextMonth}
          className='px-3 py-1 rounded border border-[#DBDAF0] focus:outline-none hover:opacity-60 focus:ring'
          aria-label='Следующий месяц'
          type='button'
        >
          &gt;
        </button>
      </div>

      {/* Дни недели */}
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

      {/* Календарь */}
      <div className='grid grid-cols-7 gap-0.5'>
        {days.map(({ dayNumber, currentMonth: isCurrent, date }, idx) => {
          const todayClass = isToday(date)
            ? "bg-[#A4A4A4] text-[#EFF7FF] font-bold"
            : "";

          const isPastDayInCurrentMonth =
            isCurrent &&
            date < today &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

          const otherMonthClass = !isCurrent
            ? "text-[#A4A4A4] opacity-60"
            : isPastDayInCurrentMonth
            ? "text-[#989898]"
            : "text-[#5E5E5E]";

          return (
            <button
              key={idx}
              onClick={() => handleDateClick(date)}
              className={`py-1 rounded text-xs md:text-sm focus:outline-none
                flex items-center justify-center
                hover:bg-[#DBDAF0]
                ${todayClass} ${otherMonthClass}`}
              aria-label={`День ${dayNumber}${
                isToday(date) ? " (Сегодня)" : ""
              }`}
              type='button'
              tabIndex={0}
            >
              {dayNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
}
