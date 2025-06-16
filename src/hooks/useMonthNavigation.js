import { useState, useCallback } from "react";

export function useMonthNavigation(initialDate = new Date()) {
  const [currentDate, setCurrentDate] = useState(initialDate);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const nextMonth = useCallback(() => {
    setCurrentDate((date) => {
      const newDate = new Date(date);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  }, []);

  const prevMonth = useCallback(() => {
    setCurrentDate((date) => {
      const newDate = new Date(date);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  }, []);

  const nextWeek = useCallback(() => {
    setCurrentDate((date) => {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + 7);
      return newDate;
    });
  }, []);

  const prevWeek = useCallback(() => {
    setCurrentDate((date) => {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() - 7);
      return newDate;
    });
  }, []);

  const today = new Date();

  return {
    currentDate,
    setCurrentDate,
    currentYear,
    currentMonth,
    nextMonth,
    prevMonth,
    nextWeek,
    prevWeek,
    today,
  };
}
