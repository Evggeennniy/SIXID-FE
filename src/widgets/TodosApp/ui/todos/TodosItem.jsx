import { useDispatch, useSelector } from "react-redux";
import {
  formatFullDate,
  formatShortDate,
} from "../../../../util/timeFormatter";
import {
  selectActiveTodoItem,
  setActiveTodoItem,
  setTodosItemIsComplete,
} from "../../../../redux/slice/todos/todosSlice";
import TodosItemStatusOfImportance from "./TodosItemStatusOfImportance";

export const TodosItem = ({
  id,
  title,
  deadline,
  statusOfImportant,
  isComplete,
}) => {
  const dispatch = useDispatch();
  const activeItem = useSelector(selectActiveTodoItem);

  const onClickHandler = () => {
    dispatch(setActiveTodoItem(id));
  };

  const onChange = () => {
    dispatch(setTodosItemIsComplete(id));
  };

  const baseStyles =
    "grid  grid-cols-[minmax(9.375rem,450px)_20px_20%] w-full sm:grid-cols-6 w-full items-start animate-item gap-[15px] pr-2 py-2 sm:p-[13px] transition-colors duration-200 cursor-pointer";

  const textColor = isComplete ? "text-[#A4A4A4]" : "text-[#5E5E5E]";
  const bgColor = activeItem === id ? "bg-white" : "bg-transparent";

  return (
    <li
      className={`${baseStyles} ${textColor} ${bgColor} hover:bg-white flex  `}
      onClick={onClickHandler}
    >
      <div className='col-span-1 sm:col-span-4 flex w-full gap-2 sm:gap-4'>
        <label className='flex items-center gap-2 p-2 cursor-pointer'>
          <input
            type='checkbox'
            name='is_done'
            checked={isComplete}
            onChange={onChange}
            onClick={(e) => e.stopPropagation()}
            className={` ${isComplete ? "accent-[#A8A5FF]" : ""}`}
          />
        </label>
        <h5
          className='sm:w-full overflow-hidden whitespace-nowrap text-ellipsis'
          title={title}
        >
          {title}
        </h5>
      </div>

      <TodosItemStatusOfImportance statusOfImportant={statusOfImportant} />

      <div className='flex sm:shrink-0  gap-1 w-full pl-1 xl:pl-4'>
        <p className='hidden sm:block  flex-1 basis-0'>
          {formatFullDate(deadline)}
        </p>

        {/* Short date (MM.YYYY), shown only on small screens */}
        <p className='block sm:hidden flex-1 pl-2 basis-0'>
          {formatShortDate(deadline)}
        </p>
      </div>
    </li>
  );
};
