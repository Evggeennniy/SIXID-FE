export const isSameDay = (d1, d2) =>
  d1?.getFullYear() === d2?.getFullYear() &&
  d1?.getMonth() === d2?.getMonth() &&
  d1?.getDate() === d2?.getDate();