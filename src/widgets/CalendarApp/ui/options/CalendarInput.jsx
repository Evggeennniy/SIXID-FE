import React from "react";
import { addNewTodoItem } from "../../../../redux/slice/todos/todosSlice";
import { isNotEmpty } from "../../../../util/validation";
import { useInput } from "../../../../hooks/useInput";
import { useDispatch } from "react-redux";
import { TodosInput } from "../../../TodosApp/ui/todos/TodosInput";

function CalendarInput({ date }) {
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

    dispatch(addNewTodoItem({ title: data.todo_title, date: date }));
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
