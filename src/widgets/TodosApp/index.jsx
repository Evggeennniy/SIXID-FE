import { TodosInput } from "./ui/todos/TodosInput";
import { TodosList } from "./ui/todos/TodosList";
import { TodosItem } from "./ui/todos/TodosItem";
import Dropdown from "../../shared/ui/dropdown/Dropdown";
import { MainSection } from "../../shared/MainSection";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodoAction,
  closeTodoOptions,
  getTodosAction,
  selectTodosActiveItems,
  selectTodosCompletedItems,
} from "../../redux/slice/todos/todosSlice";
import { useInput } from "../../hooks/useInput";
import { isNotEmpty } from "../../util/validation";
import { useEffect } from "react";
import { closeCalendarOptions } from "../../redux/slice/calendar/calendarSlice";
import { useLocation } from "react-router-dom";

export const TodosApp = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const activeTodos = useSelector(selectTodosActiveItems);
  const completedTodos = useSelector(selectTodosCompletedItems);

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

    dispatch(
      addTodoAction({
        title: data.todo_title,
        is_active: true,
        priority: "normal",
        deadline: null,
      })
    );

    setInputState({
      value: "",
      didBlur: false,
      wasValidOnBlur: false,
    });
  }

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
      <h2 className="text-lg sm:text-xl font-semibold text-center sm:text-left">
        Список задач
      </h2>
      <TodosInput
        value={messageValue}
        onBlur={handleMessageBlur}
        onChange={handleMessageChange}
        onSubmit={onSubmit}
        name="todo_title"
      />
      <TodosList>
        <div className="flex flex-col gap-8">
          <div className="cursor-pointer transition-colors ">
            {activeTodos.map((todo) => (
              <TodosItem
                key={todo.id}
                id={todo.id}
                title={todo.title}
                priority={todo.priority}
                deadline={todo.deadline}
                is_active={todo.is_active}
              />
            ))}
          </div>
          {completedTodos && completedTodos.length > 0 && (
            <Dropdown
              btnText={"Выполненые"}
              rightIcon={
                <svg
                  viewBox="0 0 448 512"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-[#5E5E5E80] w-3 h-3 mt-[2px]"
                >
                  <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
                </svg>
              }
              rightIconPosition="inline"
              className=""
            >
              <div className="text-[#5E5E5E] cursor-pointer transition-colors w-full mb-[70px] sm:md-0">
                {completedTodos.map((todo) => (
                  <TodosItem
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    priority={todo.priority}
                    deadline={todo.deadline}
                    is_active={todo.is_active}
                  />
                ))}
              </div>
            </Dropdown>
          )}
        </div>
      </TodosList>
    </MainSection>
  );
};
