function getMonthDays(year, month) {
  const date = new Date(year, month, 1);
  const days = [];

  // День недели первого числа (понедельник=0 для русской локализации)
  let firstDayWeek = (date.getDay() + 6) % 7;

  // Кол-во дней в месяце
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Кол-во дней в предыдущем месяце
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Предыдущие дни для заполнения сетки
  for (let i = firstDayWeek - 1; i >= 0; i--) {
    days.push({
      dayNumber: daysInPrevMonth - i,
      currentMonth: false,
      date: new Date(year, month - 1, daysInPrevMonth - i),
    });
  }

  // Текущий месяц
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      dayNumber: i,
      currentMonth: true,
      date: new Date(year, month, i),
    });
  }

  // Следующие дни для заполнения сетки (до полного заполнения недель)
  while (days.length % 7 !== 0) {
    const nextDay = days.length - (daysInMonth + firstDayWeek) + 1;
    days.push({
      dayNumber: nextDay,
      currentMonth: false,
      date: new Date(year, month + 1, nextDay),
    });
  }

  return days;
}
export default getMonthDays