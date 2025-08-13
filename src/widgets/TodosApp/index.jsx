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
import { useEffect, useState } from "react";
import { closeCalendarOptions } from "../../redux/slice/calendar/calendarSlice";
import { useLocation } from "react-router-dom";

import TodosCategoryIcon from "@assets/svg/todo-category-icon.svg?react";

import LampIcon from "@assets/svg/categories-icons/lamp.svg?react";
import TasksIcon from "@assets/svg/categories-icons/tasks.svg?react";
import CalendarIcon from "@assets/svg/categories-icons/calendar.svg?react";
import SmileIcon from "@assets/svg/categories-icons/smile.svg?react";

import clsx from "clsx";

const categories = [
  { id: 1, name: "Мій день", icon: <LampIcon /> },
  { id: 2, name: "Задачі", icon: <TasksIcon /> },
  { id: 3, name: "Заплановані", icon: <CalendarIcon /> },
];
export const TodosApp = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const activeTodos = useSelector(selectTodosActiveItems);
  const completedTodos = useSelector(selectTodosCompletedItems);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openCategories, setOpenCategories] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  function handleCreateCategory() {
    if (!newCategoryName.trim()) return;
    // Here you would dispatch to Redux or set local state
    console.log("Creating category:", newCategoryName);
    setNewCategoryName("");
    setIsAddingCategory(false);
  }
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
      <div className="flex items-center justify-between mb-[20px] sm:mb-0">
        <h2 className="text-lg sm:text-xl text-[#4A4A4A] text-center sm:text-left">
          Мой день
        </h2>
        <button
          onClick={() => setOpenCategories((open) => !open)}
          className={clsx(
            "cursor-pointer flex items-center gap-[5px] p-[7.5px_15px] rounded-[40px] shadow-[0px_2px_5px_0px_#DBDAF0]",
            openCategories ? "w-[320px]" : ""
          )}
        >
          <TodosCategoryIcon color={"#4A4A4A"} />
          <p className="text-[#4A4A4A]">Категории</p>
        </button>

        {/* Dropdown */}
        {openCategories && (
          <div
            className="w-[330px] flex flex-col gap-3 absolute right-0 top-31 p-2 z-[99]"
            onClick={(e) => e.stopPropagation()} // prevent menu from closing when clicking inside
          >
            {/* Categories list */}
            <div className="bg-[#F1FCFF] w-[320px] shadow-[0px_2px_5px_0px_#DBDAF0] p-2 rounded-2xl">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.name;
                return (
                  <div
                    key={cat.id}
                    onClick={() => {
                      setOpenCategories((open) => !open);
                      setSelectedCategory(cat.name);
                    }}
                    className={clsx(
                      "flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors",
                      isActive ? "bg-[#E1F5FF]" : "hover:bg-[#E1F5FF]"
                    )}
                  >
                    {cat.icon}
                    <span className="text-[#4A4A4A]">{cat.name}</span>
                  </div>
                );
              })}
            </div>

            {/* Add category */}
            <div className="flex items-center justify-between p-3 w-[320px] rounded-lg bg-[#F1FCFF] shadow-[0px_2px_5px_0px_#DBDAF0]">
              <div className="flex items-center gap-2 w-full">
                <div className="flex justify-between">
                  <div className="flex items-center gap-1">
                    <svg
                      onClick={() => setIsAddingCategory(true)}
                      className="w-4 h-4 text-[#4A4A4A] cursor-pointer"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>

                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Нова категорія"
                      className="flex-1 px-2 py-1  max-w-[160px] flex 1 focus:outline-none "
                      autoFocus
                    />
                  </div>
                  <div className="flex  justify-between items-center">
                    <SmileIcon />
                    <button
                      onClick={handleCreateCategory}
                      className="ml-2 px-3 py-1  flex-2 rounded-lg  text-[#A8A5FF] text-sm shadow-[0px_2px_5px_0px_#DBDAF0]"
                    >
                      Створити
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
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
              <div className="cursor-pointer transition-colors w-full mb-[70px] sm:md-0">
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
