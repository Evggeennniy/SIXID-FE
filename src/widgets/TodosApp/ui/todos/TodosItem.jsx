import { useDispatch, useSelector } from "react-redux";
import { addZero, formatFullDate } from "../../../../util/timeFormatter";
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
  const deadlineArray = formatFullDate(deadline);
  const dispatch = useDispatch();
  const activeItem = useSelector(selectActiveTodoItem);

  const onClickHandler = () => {
    dispatch(setActiveTodoItem(id));
  };

  const onChange = () => {
    dispatch(setTodosItemIsComplete(id));
  };

  const baseStyles =
    "grid grid-cols-4 lg:grid-cols-6 w-full items-start animate-item gap-[.9375rem] p-[.8125rem] transition-colors duration-200 cursor-pointer";

  const textColor = isComplete ? "text-[#A4A4A4]" : "text-[#5E5E5E]";
  const bgColor = activeItem === id ? "bg-white" : "bg-transparent";

  return (
    <li
      className={`${baseStyles} ${textColor} ${bgColor} hover:bg-white flex  `}
      onClick={onClickHandler}
    >
      <div className='col-span-2 lg:col-span-4 flex w-full gap-4'>
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
          className='w-full line-clamp-2 text-ellipsis overflow-hidden break-words'
          title={title}
        >
          {title}
        </h5>
      </div>

      <TodosItemStatusOfImportance statusOfImportant={statusOfImportant} />

      <div className='flex shrink-0 gap-1 w-full pl-2 xl:pl-4'>
        {deadlineArray.map((item, i) =>
          i === 0 ? (
            <p className='min-w-5' key={i}>
              {addZero(item)}
            </p>
          ) : (
            <p className='flex-1 basis-0' key={i}>
              {item}
            </p>
          )
        )}
      </div>
    </li>
  );
};
