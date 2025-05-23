import { OptionsSection } from "../../../../shared/OptionsSection";
import { useInput } from "../../../../hooks/useInput";
import { isNotEmpty } from "../../../../util/validation";
import PlusIcon from "@assets/svg/plus-icon.svg?react";
import ImportanceIcon from "@assets/svg/importance-todo-icon.svg?react";
import CalendarIcon from "@assets/svg/option-calendar-icon.svg?react";

import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewOptionItem,
  selectActiveTodoItem,
  selectIsOpenTodosOptions,
  selectTodosOptionItems,
  setTodosItemIsComplete,
} from "../../../../redux/slice/todos/todosSlice";
import TodosOptionItem from "./TodosOptionItem";
import OptionsWrapDropdown from "./OptionsWrapDropdown";

function TodosOptions() {
  const {
    value: messageValue,
    handleInputBlur: handleMessageBlur,
    handleInputChange: handleMessageChange,
    hasError: messageHasError,
    setInputState,
  } = useInput("", (value) => isNotEmpty(value));

  const isOptionsOpen = useSelector(selectIsOpenTodosOptions);
  const { active, optionItems } = useSelector((state) => {
    const active = selectActiveTodoItem(state);
    const optionItems = selectTodosOptionItems(state, active);
    return { active, optionItems };
  });

  const dispatch = useDispatch();
  function onSubmit(e) {
    e.preventDefault();
    if (!isNotEmpty(messageValue)) {
      handleMessageBlur();
      return;
    }
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());

    dispatch(addNewOptionItem(data.subtask_title));
    setInputState({
      value: "",
      didBlur: false,
      wasValidOnBlur: false,
    });
  }

  function onChange() {
    dispatch(setTodosItemIsComplete(active));
  }

  return (
    <OptionsSection
      className={clsx(
        isOptionsOpen
          ? "opacity-100 max-w-[400px] translate-x-0 pointer-events-auto"
          : "opacity-0 max-w-0 translate-x-0 pointer-events-none"
      )}
    >
      <section className='flex flex-col justify-center  w-full gap-5'>
        <div className='flex gap-4 border border-[#A4A4A4] p-4 rounded-xl shadow'>
          <input
            type='checkbox'
            name='is_done'
            className='accent-[#A8A5FF]'
            onChange={onChange}
          />
          <h5 className='leading-normal'>{active}</h5>
        </div>

        <div className='flex flex-col text-[#5E5E5E] '>
          <h5 className={"text-[#A4A4A4] mb-2"}>Подзадачи</h5>

          <div className='flex flex-col justify-start   border border-[#A4A4A4] p-2 rounded-xl shadow'>
            {/* list of subtasks */}
            <ul className='flex flex-col gap-2 p-1'>
              {optionItems?.map((item) => (
                <TodosOptionItem title={item.title} />
              ))}
            </ul>

            {/* form to add subtasks */}
            <form
              onSubmit={onSubmit}
              className='flex justify-start items-center'
            >
              <button
                type='submit'
                className='flex justify-center items-center p-1 '
              >
                <PlusIcon className='w-[1.0625rem] h-[1.0625rem]' />
              </button>
              <input
                type='text'
                name='subtask_title'
                placeholder='Добавить подзадачу'
                className={`focus:outline-none focus:ring-0`}
                value={messageValue}
                onBlur={handleMessageBlur}
                onChange={handleMessageChange}
              />
            </form>
          </div>

          {/* erro hints for user */}
          <p
            className={`${
              messageHasError ? "opacity-100" : "opacity-0"
            } text-red-400 pl-3 `}
          >
            Поле должно быть не пустым.
          </p>
          <h5 className='leading-normal'></h5>
        </div>
      </section>
      <section>
        <OptionsWrapDropdown
          icon={<ImportanceIcon />}
          text={"Важность"}
          haveDorder={true}
        ></OptionsWrapDropdown>
        <OptionsWrapDropdown
          icon={<CalendarIcon />}
          text={"Срок выполнения"}
          haveDorder={true}
        ></OptionsWrapDropdown>
        <OptionsWrapDropdown
          icon={<ImportanceIcon />}
          text={"Напомнить"}
        ></OptionsWrapDropdown>
      </section>
    </OptionsSection>
  );
}

export default TodosOptions;
