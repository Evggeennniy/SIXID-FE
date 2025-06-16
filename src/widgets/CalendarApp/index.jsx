import { useDispatch, useSelector } from "react-redux";
import {
  closeTodoOptions,
  getTodosAction,
  selectTodosAllItems,
} from "../../redux/slice/todos/todosSlice.js";
import CalendarGrid from "@widgets/CalendarApp/ui/calendar/CalendarGrid.jsx";
import CalendarHeader from "@widgets/CalendarApp/ui/calendar/CalendarHeader.jsx";
import WeekDaysHeader from "@widgets/CalendarApp/ui/calendar/WeekDaysHeader.jsx";
import getMonthDays from "../../util/calendar/getMonthDays.js";
import React, { useEffect, useState } from "react";
import { MainSection } from "@shared/MainSection/index.jsx";
import { useLocation } from "react-router-dom";
import { closeCalendarOptions } from "../../redux/slice/calendar/calendarSlice.js";
import { mapTodosToDate } from "../../util/calendar/mapTodosToDate.js";
import { useMonthNavigation } from "../../hooks/useMonthNavigation.js";
import { splitDaysIntoWeeks } from "../../util/calendar/splitDaysIntoWeeks.js";

export default function CalendarApp() {
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    currentDate,
    nextMonth,
    prevMonth,
    nextWeek,
    prevWeek,
    currentMonth,
    currentYear,
    today,
  } = useMonthNavigation();

  const monthDays = getMonthDays(currentYear, currentMonth);

  const [viewMode, setViewMode] = useState("month");

  const items = useSelector(selectTodosAllItems);
  const deadlineMap = mapTodosToDate(items);

  const { currentWeek } = splitDaysIntoWeeks(monthDays, currentDate);

  const visibleDays = viewMode === "month" ? monthDays : currentWeek;

  const handlePrev = () => {
    if (viewMode === "month") {
      prevMonth();
    } else {
      prevWeek();
    }
  };
  const handleNext = () => {
    if (viewMode === "month") {
      nextMonth();
    } else {
      nextWeek();
    }
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
      <div className='bg-transparent rounded-lg w-full h-full'>
        <CalendarHeader
          month={currentMonth}
          year={currentYear}
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
