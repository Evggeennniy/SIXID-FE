import React from "react";
import {
  addNewTodoItem,
  addTodoAction,
} from "../../../../redux/slice/todos/todosSlice";
import { isNotEmpty } from "../../../../util/validation";
import { useInput } from "../../../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { TodosInput } from "../../../TodosApp/ui/todos/TodosInput";
import { formatDateToYYYYMMDD } from "../../../../util/timeFormatter";
import { selectActiveCalendarDay } from "../../../../redux/slice/calendar/calendarSlice";

function CalendarInput() {
  const activeDay = useSelector(selectActiveCalendarDay);
  const dispatch = useDispatch();
  const {
    value: messageValue,
    handleInputBlur: handleMessageBlur,
    handleInputChange: handleMessageChange,

    setInputState,
  } = useInput("", (value) => isNotEmpty(value));
  function onSubmit(e) {
    e.preventDefault();

    if (!isNotEmpty(messageValue)) {
      handleMessageBlur();
      return;
    }
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    if (activeDay) {
      const newDate = new Date(activeDay);
      const formatedDate = formatDateToYYYYMMDD(newDate);

      dispatch(addNewTodoItem({ title: data.todo_title, date: formatedDate }));

      dispatch(
        addTodoAction({
          title: data.todo_title,
          is_active: true,
          priority: "normal",
          deadline: formatedDate,
        })
      );
    }

    setInputState({
      value: "",
      didBlur: false,
      wasValidOnBlur: false,
    });
  }
  return (
    <TodosInput
      value={messageValue}
      onBlur={handleMessageBlur}
      onChange={handleMessageChange}
      onSubmit={onSubmit}
      name='todo_title'
    />
  );
}

export default CalendarInput;
