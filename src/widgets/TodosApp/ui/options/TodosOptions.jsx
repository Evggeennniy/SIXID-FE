import { OptionsSection } from "../../../../shared/OptionsSection";
import { useInput } from "../../../../hooks/useInput";
import { isNotEmpty } from "../../../../util/validation";
import PlusIcon from "@assets/svg/plus-icon.svg?react";
import ImportanceIcon from "@assets/svg/importance-todo-icon.svg?react";
import CalendarIcon from "@assets/svg/option-calendar-icon.svg?react";
import BacketIcon from "@assets/svg/backet.svg?react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewOptionItem,
  closeTodoOptions,
  deleteTodoItem,
  selectActiveTodoItem,
  selectIsOpenTodosOptions,
  selectTodosOptionItems,
  setTodosItemIsComplete,
} from "../../../../redux/slice/todos/todosSlice";
import TodosOptionItem from "./TodosOptionItem";
import OptionsWrapDropdown from "./OptionsWrapDropdown";
import SingleSelectOptions from "./SingleSelectOptionOfImportance";
import OptionsCalendar from "./calendar/OptionsCalendar";
import Button from "../../../../shared/ui/Button";
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
  const { activeTodo, optionItems } = useSelector((state) => {
    const activeTodo = state.todos.todosList.find(
      (todo) => todo.id === selectActiveTodoItem(state)
    );
    const subtasks = selectTodosOptionItems(state, activeTodo?.id);
    return { activeTodo, optionItems: subtasks };
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
  function onDeleteTodoItem() {
    dispatch(deleteTodoItem(activeTodo?.id));
  }
  function onCloseOptions() {
    dispatch(closeTodoOptions());
  }
  return (
    <OptionsSection
      open={isOptionsOpen}
      onClose={onCloseOptions}
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
              <div className="flex items-center w-full">
                <div className="flex items-center w-full gap-2">
                  <label className="relative flex items-center gap-1 py-3 px-2 cursor-pointer bg-[#ECF7FF] rounded">
                    <input
                        type="checkbox"
                        name="is_done"
                        checked={activeTodo?.status === 'complete'}
                        onChange={onChange}
                        className="absolute w-5 h-5 opacity-0 cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <span
                        className={`w-5 h-5 rounded border border-gray-300 flex items-center justify-center
                      ${activeTodo?.status === 'complete'  ? "bg-[#A8A5FF]" : "bg-[#ECF7FF]"}`}
                    >
                  {activeTodo?.status === 'complete' && (
                      <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                  )}
                </span>
                  </label>
                  <h5 className="break-words min-w-0 leading-normal w-full">
                    {activeTodo?.title}
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col text-[#5E5E5E] ">
            <h5 className={"text-[#A4A4A4] mb-2"}>Подзадачи</h5>

            <div className="flex flex-col justify-start   border border-[#E0E4FF] p-2 rounded-xl shadow">
              {/* list of subtasks */}
              <ul className="flex flex-col gap-2 p-1">
                {optionItems?.map((item) => (
                    <TodosOptionItem title={item.title}/>
                ))}
              </ul>

              {/* form to add subtasks */}
              <form
                  onSubmit={onSubmit}
                  className="flex justify-start items-center w-full"
              >
                <button
                    type="submit"
                    className="flex justify-center items-center p-1 "
                >
                  <PlusIcon className="w-[1.0625rem] h-[1.0625rem]"/>
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
        <div className='flex mt-[10%] md:mt-auto gap-2 pb-2 '>
          <Button text='Закрыть' classname={"w-1/2"} onClick={onCloseOptions} />
          <Button
            text={<BacketIcon />}
            classname={"border border-[#CDCDCD] w-1/2"}
            onClick={onDeleteTodoItem}
          />
        </div>
      </div>
    </OptionsSection>
  );
}

export default TodosOptions;
