import {
  changeTodosAction,
  selectActiveTodoItem,
  setTodosItemDeadline,
} from "../../../../../redux/slice/todos/todosSlice";

import { useSelector, useDispatch } from "react-redux";
import BaseCalendar from "../../../../../shared/BaseCalendar/BaseCalendar";
import { formatDateToYYYYMMDD } from "../../../../../util/timeFormatter";

export default function OptionsCalendar() {
  const dispatch = useDispatch();

  const today = new Date();
  const activeTodo = useSelector((state) =>
    state.todos.todosList.find(
      (todo) => todo.id === selectActiveTodoItem(state)
    )
  );

  const deadline = activeTodo?.deadline ? new Date(activeTodo.deadline) : null;

  const color =
    activeTodo?.statusOfImportant === "важно"
      ? "rgba(50, 195, 104, 1)"
      : activeTodo?.statusOfImportant === "срочно"
      ? "rgba(255, 0, 0, 1)"
      : "rgba(150, 227, 255, 1)";

  const handleDateClick = (date) => {
    if (activeTodo) {
      const formatedDate = formatDateToYYYYMMDD(date);
      dispatch(
        setTodosItemDeadline({
          id: activeTodo.id,
          deadline: formatedDate,
        })
      );
      dispatch(
        changeTodosAction({
          id: activeTodo.id,
          data: { deadline: formatedDate },
        })
      );
    }
  };

  return (
    <BaseCalendar
      highlightDate={deadline}
      highlightColor={color}
      onDateClick={handleDateClick}
      labelProvider={(date) => {
        const isToday =
          date.getFullYear() === today.getFullYear() &&
          date.getMonth() === today.getMonth() &&
          date.getDate() === today.getDate();

        const isDeadline =
          deadline &&
          date.getFullYear() === deadline.getFullYear() &&
          date.getMonth() === deadline.getMonth() &&
          date.getDate() === deadline.getDate();

        return `День ${date.getDate()}${isToday ? " (Сегодня)" : ""}${
          isDeadline ? " (Срок выполнения)" : ""
        }`;
      }}
    />
  );
}
