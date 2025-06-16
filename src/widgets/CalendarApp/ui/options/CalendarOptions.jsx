import React, { useEffect } from "react";
import { OptionsSection } from "@shared/OptionsSection/index.jsx";
import OptionsWrapDropdown from "@widgets/TodosApp/ui/options/OptionsWrapDropdown.jsx";
import CalendarIcon from "@assets/svg/option-calendar-icon.svg?react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import CalendarAppCalendar from "./CalendarAppCalendar";
import {
  closeCalendarOptions,
  selectActiveCalendarDay,
  selectIsOpenCalendarOptions,
} from "../../../../redux/slice/calendar/calendarSlice";
import {
  addNewOptionItem,
  changeTodosAction,
  createSubtaskAction,
  deleteTodoItem,
  deleteTodosAction,
  selectActiveDayTasks,
  selectActiveTodoItem,
  selectTodosOptionItems,
  setActiveTodoItem,
  setTodoItemTitle,
  setTodosItemIsComplete,
} from "../../../../redux/slice/todos/todosSlice";
import TodosOptionItem from "../../../TodosApp/ui/options/TodosOptionItem";
import { isNotEmpty } from "../../../../util/validation";
import { useInput } from "../../../../hooks/useInput";

import CalendarInput from "./CalendarInput";
import BacketIcon from "@assets/svg/backet.svg?react";
import DayTasksList from "./DayTaskList";
import EditTaskTitleForm from "./EditTaskTitleForm";
import SubtasksSection from "./SubTasksSection";

function CalendarOptions() {
  const dispatch = useDispatch();
  const isOptionsOpen = useSelector(selectIsOpenCalendarOptions);
  const activeDay = useSelector(selectActiveCalendarDay);
  const dayTasks = useSelector(selectActiveDayTasks);

  const { activeTodo, optionItems } = useSelector((state) => {
    const activeTodo = state.todos.todosList.find(
      (todo) => todo.id === selectActiveTodoItem(state)
    );
    const subtasks = selectTodosOptionItems(state, activeTodo?.id);
    return { activeTodo, optionItems: subtasks };
  });

  const {
    value: messageValue,
    handleInputBlur: handleMessageBlur,
    handleInputChange: handleMessageChange,
    setInputState,
  } = useInput("", isNotEmpty);

  const {
    value: inputTaskValue,
    handleInputBlur,
    handleInputChange,
    setInputState: setInputTaskState,
  } = useInput(activeTodo?.title || "", isNotEmpty);

  useEffect(() => {
    setInputTaskState({
      value: activeTodo?.title,
      didBlur: false,
      wasValidOnBlur: false,
    });
  }, [activeTodo?.title]);

  const handleToggle = (todoId, status) => {
    dispatch(setTodosItemIsComplete(todoId));
    dispatch(
      changeTodosAction({
        id: todoId,
        data: { is_active: !status },
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isNotEmpty(messageValue)) {
      handleMessageBlur();
      return;
    }
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    dispatch(
      createSubtaskAction({ taskId: activeTodo?.id, title: data.subtask_title })
    );
    setInputState({
      value: "",
      didBlur: false,
      wasValidOnBlur: false,
    });
  };

  const onSubmitInput = (e) => {
    e.preventDefault();
    if (!isNotEmpty(inputTaskValue)) {
      handleInputBlur();
      return;
    }
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    dispatch(
      setTodoItemTitle({
        id: activeTodo?.id,
        title: data.input_title,
      })
    );
    dispatch(
      changeTodosAction({
        id: activeTodo?.id,
        data: { title: data.input_title },
      })
    );
  };

  const onDeleteTodoItem = () => {
    dispatch(deleteTodoItem(activeTodo?.id));
    dispatch(deleteTodosAction(activeTodo?.id));
  };

  const onCloseOptions = () => {
    dispatch(closeCalendarOptions());
  };

  return (
    <OptionsSection
      open={isOptionsOpen}
      onClose={onCloseOptions}
      className={clsx(
        isOptionsOpen
          ? "opacity-100 w-full md:max-w-[25rem] translate-x-0 pointer-events-auto pb-[8.25rem]! sm:pb-4!"
          : "opacity-0 max-w-0 translate-x-0 pointer-events-none"
      )}
    >
      <div className='flex flex-col gap-6 w-full h-full px-5 pb-5 md:p-5 min-h-fit'>
        <DayTasksList
          tasks={dayTasks}
          activeTodoId={activeTodo?.id}
          onSelect={(id) => dispatch(setActiveTodoItem(id))}
          onToggle={handleToggle}
        />

        <div className='mt-auto'>
          {dayTasks?.length > 0 && (
            <div className='flex flex-col min-h-[13.625rem] w-[95%] mx-auto'>
              <SubtasksSection
                inputValue={messageValue}
                onInputChange={handleMessageChange}
                onInputBlur={handleMessageBlur}
                onSubmit={onSubmit}
                subtasks={optionItems}
                taskId={activeTodo?.id}
              />

              <EditTaskTitleForm
                value={inputTaskValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onSubmit={onSubmitInput}
              />

              <OptionsWrapDropdown
                icon={<CalendarIcon />}
                text={"Другая дата"}
                haveDorder={true}
              >
                <CalendarAppCalendar />
              </OptionsWrapDropdown>

              <button
                onClick={onDeleteTodoItem}
                className='border-t border-b border-[#E0E4FF] w-full flex gap-2 py-3 text-[#CDCDCD]'
              >
                <BacketIcon /> Удалить
              </button>
            </div>
          )}
        </div>

        <CalendarInput date={activeDay} />
      </div>
    </OptionsSection>
  );
}

export default CalendarOptions;
