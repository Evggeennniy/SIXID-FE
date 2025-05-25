import { useDispatch, useSelector } from "react-redux";
import { addZero, formatFullDate } from "../../../../util/timeFormatter";
import {
  selectActiveTodoItem,
  setActiveTodoItem,
  setTodosItemIsComplete,
} from "../../../../redux/slice/todos/todosSlice";
import TodosItemStatusOfImportance from "./TodosItemStatusOfImportance";

export const TodosItem = ({
  title,
  deadline,
  statusOfImportant,
  isComplete,
}) => {
  const deadlineArray = formatFullDate(deadline);
  const dispatch = useDispatch();
  const activeItem = useSelector(selectActiveTodoItem);

  function onClickHandler() {
    dispatch(setActiveTodoItem(title));
  }
  function onChange() {
    dispatch(setTodosItemIsComplete(title));
  }
  return (
    <>
      {!isComplete && (
        <li
          className={`grid grid-cols-6 w-full items-start animate-item   text-[#5E5E5E] gap-[.9375rem] p-[.8125rem]
          ${activeItem === title ? "bg-white" : "bg-transparent"}
          hover:bg-white cursor-pointer transition-colors duration-200`}
          onClick={onClickHandler}
        >
          <div className='col-span-4 flex gap-4'>
            <input
              type='checkbox'
              name='is_done'
              onChange={onChange}
              onClick={(e) => e.stopPropagation()}
            />

            <h5 className='leading-normal w-full'>{title}</h5>
          </div>
          <TodosItemStatusOfImportance statusOfImportant={statusOfImportant} />

          <div className={"flex gap-1 pl-4"}>
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
      )}
      {isComplete && (
        <li
          className={`grid grid-cols-6 w-full animate-item items-start text-[#A4A4A4]  gap-[.9375rem] p-[.8125rem]
          ${activeItem === title ? "bg-white" : "bg-transparent"}
          hover:bg-white cursor-pointer transition-colors duration-200`}
          onClick={onClickHandler}
        >
          <div className='col-span-4 flex gap-4 '>
            <input
              type='checkbox'
              checked={true}
              name='is_done'
              onChange={onChange}
              className='accent-[#A8A5FF]'
              onClick={(e) => e.stopPropagation()}
            />
            <h5 className='leading-normal '>{title}</h5>
          </div>
          <TodosItemStatusOfImportance statusOfImportant={statusOfImportant} />

          <div className={"flex gap-1 pl-4"}>
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
      )}
    </>
  );
};
