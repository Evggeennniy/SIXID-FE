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
import SingleSelectOptions from "./SingleSelectOptionOfImportance";
import OptionsCalendar from "./calendar/OptionsCalendar";
const importanceOptions = [
  { value: "срочно", label: "Срочно" },
  { value: "важно", label: "Важно" },
  { value: "обычно", label: "Обычно" },
];
function TodosOptions() {
  const {
    value: messageValue,
    handleInputBlur: handleMessageBlur,
    handleInputChange: handleMessageChange,
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
          ? "opacity-100 max-w-[25rem] translate-x-0 pointer-events-auto   "
          : "opacity-0 max-w-0 translate-x-0 p-0 pointer-events-none"
      )}
    >
      <div className='flex flex-col gap-6 w-full '>
        <section className='flex flex-col justify-center  w-full gap-5'>
          <div className='flex flex-col sm:flex-row sm:items-center md:gap-2 xl:gap-4 border border-[#E0E4FF] p-4 rounded-xl shadow w-full max-w-md mx-auto min-w-0'>
            <input
              type='checkbox'
              name='is_done'
              className='accent-[#A8A5FF] self-start sm:self-auto'
              onChange={onChange}
            />
            <h5 className='leading-normal w-full break-words min-w-0'>
              {active}
            </h5>
          </div>

          <div className='flex flex-col text-[#5E5E5E] '>
            <h5 className={"text-[#A4A4A4] mb-2"}>Подзадачи</h5>

            <div className='flex flex-col justify-start   border border-[#E0E4FF] p-2 rounded-xl shadow'>
              {/* list of subtasks */}
              <ul className='flex flex-col gap-2 p-1'>
                {optionItems?.map((item) => (
                  <TodosOptionItem title={item.title} />
                ))}
              </ul>

              {/* form to add subtasks */}
              <form
                onSubmit={onSubmit}
                className='flex justify-start items-center w-full'
              >
                <button
                  type='submit'
                  className='flex justify-center items-center p-1 '
                >
                  <PlusIcon className='w-[17px] h-[17px]' />
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
            </div>

            {/* erro hints for user */}
            {/* <p
              className={`${
                messageHasError ? "opacity-100" : "opacity-0"
              } text-red-400 pl-3 `}
            >
              Поле должно быть не пустым.
            </p> */}
            <h5 className='leading-normal'></h5>
          </div>
        </section>
        <section>
          <OptionsWrapDropdown
            icon={<ImportanceIcon />}
            text={"Важность"}
            haveDorder={true}
          >
            <ul className='flex flex-col w-full gap-2 pl-3'>
              <SingleSelectOptions options={importanceOptions} />
            </ul>
          </OptionsWrapDropdown>
          <OptionsWrapDropdown
            icon={<CalendarIcon />}
            text={"Срок выполнения"}
            haveDorder={true}
          >
            <OptionsCalendar />
          </OptionsWrapDropdown>
          <OptionsWrapDropdown
            icon={<ImportanceIcon />}
            text={"Напомнить"}
          ></OptionsWrapDropdown>
        </section>
      </div>
    </OptionsSection>
  );
}

export default TodosOptions;
