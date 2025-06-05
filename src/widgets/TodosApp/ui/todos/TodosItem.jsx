import { useDispatch, useSelector } from "react-redux";
import {
  formatFullDate,
  formatShortDate,
} from "../../../../util/timeFormatter";
import {
  changeTodosAction,
  selectActiveTodoItem,
  setActiveTodoItem,
  setTodosItemIsComplete,
} from "../../../../redux/slice/todos/todosSlice";
import TodosItemStatusOfImportance from "./TodosItemStatusOfImportance";

export const TodosItem = ({ id, title, deadline, priority, is_active }) => {
  const dispatch = useDispatch();
  const activeItem = useSelector(selectActiveTodoItem);

  const onClickHandler = () => {
    dispatch(setActiveTodoItem(id));
  };
  const handleToggle = (todoId) => {
    dispatch(setTodosItemIsComplete(id));
    dispatch(
      changeTodosAction({
        id: todoId,
        data: { is_active: !is_active },
      })
    );
  };
  const baseStyles =
    "grid  grid-cols-[minmax(9.375rem,450px)_20px_20%] w-full sm:grid-cols-6 w-full items-start animate-item gap-[15px] pr-2 py-2 sm:p-[13px] transition-colors duration-200 cursor-pointer";

  const textColor = is_active ? "text-[#A4A4A4]" : "text-[#5E5E5E]";
  const bgColor = activeItem === id ? "bg-white" : "bg-transparent";

  return (
    <li
      className={`${baseStyles} ${textColor} ${bgColor} hover:bg-white flex  `}
      onClick={onClickHandler}
    >
      <div className='col-span-1 sm:col-span-4 items-center flex w-full gap-2 sm:gap-4'>
        <label className='relative flex items-center cursor-pointer p-2'>
          <input
            type='checkbox'
            name='is_done'
            checked={is_active}
            onChange={() => handleToggle(id, is_active)}
            onClick={(e) => e.stopPropagation()}
            className='absolute w-6 h-6 opacity-0 cursor-pointer'
          />
          <span
            className={`w-[18px] h-[18px] rounded border border-gray-300 flex items-center justify-center
      ${!is_active ? "bg-[#A8A5FF]" : "bg-[#ECF7FF]"}`}
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
          </span>
        </label>
        <h5
          className='overflow-hidden sm:line-clamp-1 line-clamp-2'
          title={title}
        >
          {title}
        </h5>
      </div>

      <TodosItemStatusOfImportance priority={priority} />

      <div className='flex sm:shrink-0  gap-1 w-full pl-1 xl:pl-4'>
        <p className='hidden sm:block text-center  flex-1 basis-0'>
          {(deadline && formatFullDate(deadline)) || "Не указан"}
        </p>

        {/* Short date (MM.YYYY), shown only on small screens */}
        <p className='block sm:hidden flex-1 pl-2 basis-0'>
          {(deadline && formatShortDate(deadline)) || "Не указан"}
        </p>
      </div>
    </li>
  );
};
