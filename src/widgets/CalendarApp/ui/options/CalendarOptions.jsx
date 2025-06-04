import React from "react";
import { OptionsSection } from "@shared/OptionsSection/index.jsx";
import OptionsWrapDropdown from "@widgets/TodosApp/ui/options/OptionsWrapDropdown.jsx";
import CalendarIcon from "@assets/svg/option-calendar-icon.svg?react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import CalendarAppCalendar from "./CalendarAppCalendar";
import {
  selectActiveCalendarDay,
  selectActiveDayTasks,
  selectIsOpenCalendarOptions,
} from "../../../../redux/slice/calendar/calendarSlice";
import {
  addNewOptionItem,
  selectActiveTodoItem,
  selectTodosOptionItems,
  setActiveTodoItem,
  setTodosItemIsComplete,
} from "../../../../redux/slice/todos/todosSlice";
import TodosOptionItem from "../../../TodosApp/ui/options/TodosOptionItem";
import { isNotEmpty } from "../../../../util/validation";
import { useInput } from "../../../../hooks/useInput";
import SubtasksIcon from "@assets/svg/subtasks.svg?react";
import { TodosInput } from "../../../TodosApp/ui/todos/TodosInput";
import CalendarInput from "./CalendarInput";
function CalendarOptions() {
  const dispatch = useDispatch();
  const {
    value: messageValue,
    handleInputBlur: handleMessageBlur,
    handleInputChange: handleMessageChange,
    setInputState,
  } = useInput("", (value) => isNotEmpty(value));

  const isOptionsOpen = useSelector(selectIsOpenCalendarOptions);

  const activeDay = useSelector(selectActiveCalendarDay);
  console.log(activeDay);
  const dayTasks = useSelector(selectActiveDayTasks);
  const { activeTodo, optionItems } = useSelector((state) => {
    const activeTodo = state.todos.todosList.find(
      (todo) => todo.id === selectActiveTodoItem(state)
    );
    const subtasks = selectTodosOptionItems(state, activeTodo?.id);
    return { activeTodo, optionItems: subtasks };
  });

  function onSubmit(e) {
    e.preventDefault();
    if (!isNotEmpty(messageValue)) {
      handleMessageBlur();
      return;
    }
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());

    dispatch(
      addNewOptionItem({ todoId: activeTodo?.id, title: data.subtask_title })
    );
    setInputState({
      value: "",
      didBlur: false,
      wasValidOnBlur: false,
    });
  }

  function onChange() {
    if (!activeTodo) return;
    dispatch(setTodosItemIsComplete(activeTodo.id));
  }
  return (
    <OptionsSection
      open={isOptionsOpen}
      className={clsx(
        isOptionsOpen
          ? "opacity-100 w-full md:max-w-[400px] translate-x-0 pointer-events-auto   "
          : "opacity-0 max-w-0 translate-x-0 pointer-events-none"
      )}
    >
      <div className='flex flex-col gap-6 w-full h-full px-12 pb-5 md:p-5  min-h-fit    '>
        <section className='flex flex-col justify-center  w-full gap-5'>
          <div className='flex flex-col text-[#5E5E5E] '>
            <h5 className={"text-[#A4A4A4] mb-2 md:hidden"}>Главая задача</h5>

            <div className='flex flex-col justify-center sm:flex-row sm:items-center gap-2  border border-[#E0E4FF] p-2 rounded-xl shadow w-full   min-w-0'>
              <div className='flex items-center w-full'>
                <div className='flex items-center w-full gap-2'>
                  <label className='relative flex items-center gap-1 py-3 px-2 cursor-pointer bg-[#ECF7FF] rounded'>
                    <input
                      type='checkbox'
                      name='is_done'
                      checked={activeTodo?.status === "complete"}
                      onChange={onChange}
                      className='absolute w-5 h-5 opacity-0 cursor-pointer'
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span
                      className={`w-5 h-5 rounded border border-gray-300 flex items-center justify-center
                      ${
                        activeTodo?.status === "complete"
                          ? "bg-[#A8A5FF]"
                          : "bg-[#ECF7FF]"
                      }`}
                    >
                      {activeTodo?.status === "complete" && (
                        <svg
                          className='w-4 h-4 text-white'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M5 13l4 4L19 7'
                          />
                        </svg>
                      )}
                    </span>
                  </label>
                  <h5 className='break-words min-w-0 leading-normal w-full'>
                    {activeTodo?.title}
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col '>
            <OptionsWrapDropdown
              icon={<SubtasksIcon />}
              text={`Подзадачи (${optionItems.length || 0})`}
              haveDorder={true}
            >
              <div className='flex flex-col gap-2'>
                <form
                  onSubmit={onSubmit}
                  className='flex justify-start items-center shodow rounded w-full  rounded-sm p-3 shadow-[0_0_10px_rgba(0,0,0,0.1)]'
                >
                  <button
                    type='submit'
                    className='flex justify-center items-center p-1 '
                  >
                    {/* <PlusIcon className='w-[1.0625rem] h-[1.0625rem]' /> */}
                  </button>
                  <input
                    type='text'
                    name='subtask_title'
                    placeholder='Добавить подзадачу'
                    className={`focus:outline-none focus:ring-0 w-full`}
                    value={messageValue}
                    onBlur={handleMessageBlur}
                    onChange={handleMessageChange}
                  />
                </form>
                <ul className='flex flex-col gap-2 p-1'>
                  {optionItems?.map((item) => (
                    <TodosOptionItem
                      key={item.title}
                      title={item.title}
                      optionId={item.id}
                      id={activeTodo?.id}
                    />
                  ))}
                </ul>
              </div>
            </OptionsWrapDropdown>

            <OptionsWrapDropdown
              icon={<CalendarIcon />}
              text={"Изменить"}
              haveDorder={true}
            >
              ф{/* <CalendarAppCalendar /> */}
            </OptionsWrapDropdown>

            <OptionsWrapDropdown
              icon={<CalendarIcon />}
              text={"Другая дата"}
              haveDorder={true}
            >
              <CalendarAppCalendar />
            </OptionsWrapDropdown>
          </div>

          {dayTasks
            .filter((item) => item.id !== activeTodo?.id)
            ?.map((item) => (
              <>
                {" "}
                <div
                  className='flex flex-col justify-center sm:flex-row sm:items-center gap-2  border border-[#E0E4FF] p-2 rounded-xl shadow w-full   min-w-0'
                  onClick={() => dispatch(setActiveTodoItem(item.id))}
                >
                  <div className='flex items-center w-full'>
                    <div className='flex items-center w-full gap-2'>
                      <label className='relative flex items-center gap-1 py-3 px-2 cursor-pointer bg-[#ECF7FF] rounded'>
                        <input
                          type='checkbox'
                          name='is_done'
                          checked={item?.status === "complete"}
                          className='absolute w-5 h-5 opacity-0 cursor-pointer'
                        />
                        <span
                          className={`w-5 h-5 rounded border border-gray-300 flex items-center justify-center
                      ${
                        item?.status === "complete"
                          ? "bg-[#A8A5FF]"
                          : "bg-[#ECF7FF]"
                      }`}
                        >
                          {item?.status === "complete" && (
                            <svg
                              className='w-4 h-4 text-white'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'
                              viewBox='0 0 24 24'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M5 13l4 4L19 7'
                              />
                            </svg>
                          )}
                        </span>
                      </label>
                      <h5 className='break-words min-w-0 leading-normal w-full'>
                        {item?.title}
                      </h5>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </section>
        <div className='mt-auto'>
          <CalendarInput date={activeDay} />
        </div>
      </div>
    </OptionsSection>
  );
}

export default CalendarOptions;
