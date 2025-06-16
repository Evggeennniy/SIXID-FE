import { useState } from "react";
import { useMonthNavigation } from "../../hooks/useMonthNavigation";
import { isSameDay } from "../../util/calendar/dateUtils";
import getMonthDays from "../../util/calendar/getMonthDays";

const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export default function BaseCalendar({
  highlightDate,
  highlightColor = "#FFA500",
  onDateClick,
  // labelProvider = (date) => `День ${date.getDate()}`,
}) {
  const {
    currentDate,
    nextMonth,
    prevMonth,
    setCurrentDate,
    currentMonth,
    currentYear,
    today,
  } = useMonthNavigation();
  const days = getMonthDays(currentYear, currentMonth);

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
