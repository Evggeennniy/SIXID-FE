import { useDispatch, useSelector } from "react-redux";
import {
  closeTodoOptions,
  getTodosAction,
  selectTodosAllItems,
} from "../../redux/slice/todos/todosSlice.js";
import CalendarGrid from "@widgets/CalendarApp/ui/calendar/CalendarGrid.jsx";
import CalendarHeader from "@widgets/CalendarApp/ui/calendar/CalendarHeader.jsx";
import WeekDaysHeader from "@widgets/CalendarApp/ui/calendar/WeekDaysHeader.jsx";
import getMonthDays from "../../util/getMonthDays.js";
import React, { useEffect, useState } from "react";
import { MainSection } from "@shared/MainSection/index.jsx";
import { useLocation } from "react-router-dom";
import { closeCalendarOptions } from "../../redux/slice/calendar/calendarSlice.js";

export default function CalendarApp() {
  const dispatch = useDispatch();
  const location = useLocation();
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [viewMode, setViewMode] = useState("month");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthDays = getMonthDays(year, month);

  const items = useSelector(selectTodosAllItems);

  const deadlineMap = items.reduce((map, item) => {
    const dateStr = new Date(item.deadline).toDateString();
    if (!map[dateStr]) map[dateStr] = [];
    map[dateStr].push(item.id);
    return map;
  }, {});

  const weeks = [];
  for (let i = 0; i < monthDays.length; i += 7) {
    weeks.push(monthDays.slice(i, i + 7));
  }

  const currentWeekIndex = weeks.findIndex((week) =>
    week.some((day) => day.date.toDateString() === currentDate.toDateString())
  );
  const currentWeek = weeks[currentWeekIndex] || [];

  const visibleDays = viewMode === "month" ? monthDays : currentWeek;

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    viewMode === "month"
      ? newDate.setMonth(month - 1)
      : newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    viewMode === "month"
      ? newDate.setMonth(month + 1)
      : newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  useEffect(() => {
    dispatch(getTodosAction());
  }, []);

  useEffect(() => {
    return () => {
      dispatch(closeCalendarOptions());
      dispatch(closeTodoOptions());
    };
  }, [location.pathname]);
  return (
    <MainSection>
      <div className=' bg-transparent rounded-lg w-full text-[#4A4A4A]'>
        <CalendarHeader
          month={month}
          year={year}
          onPrev={handlePrev}
          onNext={handleNext}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        <WeekDaysHeader />
        <CalendarGrid
          days={visibleDays}
          today={today}
          deadlineMap={deadlineMap}
        />
      </div>
    </MainSection>
  );
}
