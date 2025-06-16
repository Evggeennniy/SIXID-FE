export function splitDaysIntoWeeks(days, currentDate) {
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const currentWeekIndex = weeks.findIndex((week) =>
    week.some((day) => day.date.toDateString() === currentDate.toDateString())
  );

  const currentWeek = weeks[currentWeekIndex] || [];

  return { weeks, currentWeek, currentWeekIndex };
}
