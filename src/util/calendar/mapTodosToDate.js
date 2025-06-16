
export function mapTodosToDate(items) {
  return items.reduce((map, item) => {
    const dateStr = new Date(item.deadline).toDateString();
    if (!map[dateStr]) map[dateStr] = [];
    map[dateStr].push(item.id);
    return map;
  }, {});
}
