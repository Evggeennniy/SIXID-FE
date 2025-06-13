import { useDispatch, useSelector } from "react-redux";
import { formatFullDate } from "../../../../util/timeFormatter";
import {
  changeTodosAction,
  selectActiveTodoItem,
  setActiveTodoItem,
  setTodosItemIsComplete,
} from "../../../../redux/slice/todos/todosSlice";
import TodosItemStatusOfImportance from "./TodosItemStatusOfImportance";
import CalendarIcon from "@assets/svg/option-calendar-icon.svg?react";
export const TodosItem = ({ id, title, deadline, priority, is_active }) => {
  const dispatch = useDispatch();
  const activeItem = useSelector(selectActiveTodoItem);

  const onClickHandler = () => {
    dispatch(setActiveTodoItem(id));
  };
  const handleToggle = (todoId) => {
    dispatch(setTodosItemIsComplete(todoId));
    dispatch(
      changeTodosAction({
        id: todoId,
        data: { is_active: !is_active },
      })
    );
  };
  const baseStyles =
    "grid  grid-cols-[90%_10%] w-full w-full items-start animate-item gap-[15px]  px-2 py-2 sm:p-[13px] transition-colors duration-200 cursor-pointer";

  const textColor = !is_active ? "text-[#A4A4A4]" : "text-[#5E5E5E]";
  const bgColor = activeItem === id ? "bg-[#E1F5FF]" : "bg-transparent";

  return (
    <li
      className={`${baseStyles} ${textColor} ${bgColor} hover:bg-[#E1F5FF] flex items-center border-t border-[#D2E6F0] last:border-b  `}
      onClick={onClickHandler}
    >
      <div className='col-span-1  items-center flex w-full gap-2 sm:gap-4'>
        <div className={`flex items-start w-full gap-2 `}>
          <label className='relative flex items-center gap-1 pb-3 pt-4 px-2 cursor-pointer bg-transparent rounded'>
            <span
              className={`w-5 h-5 rounded border border-gray-300 flex items-center justify-center ${
                !is_active ? "bg-[#A8A5FF]" : "bg-[#ECF7FF]"
              }`}
            >
              {!is_active && (
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

              <input
                type='checkbox'
                checked={!is_active}
                onChange={() => handleToggle(id, is_active)}
                onClick={(e) => e.stopPropagation()}
                className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
              />
            </span>
          </label>

          <div
            className={`flex flex-col justify-center gap-1 min-h-[48px] ${
              !deadline ? "h-full justify-center" : ""
            }`}
          >
            <h5 className='break-words min-w-0 leading-normal w-full'>
              {title}
            </h5>
            {deadline && (
              <span className='text-sm text-[#5E5E5E] flex gap-2 items-center'>
                <CalendarIcon className='w-[15px] h-[15px]' />
                {formatFullDate(deadline)}
              </span>
            )}
          </div>
        </div>
      </div>

      <TodosItemStatusOfImportance priority={priority} />
    </li>
  );
};
