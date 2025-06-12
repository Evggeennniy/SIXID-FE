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
import CheckboxTodo from "../../../../shared/CheakBoxTodo/CheakoxTodo";

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
    "grid  grid-cols-[minmax(9.375rem,450px)_20px_20%] w-full sm:grid-cols-6 w-full items-start animate-item gap-[15px] pr-2 py-2 sm:p-[13px] transition-colors duration-200 cursor-pointer";

  const textColor = !is_active ? "text-[#A4A4A4]" : "text-[#5E5E5E]";
  const bgColor = activeItem === id ? "bg-white" : "bg-transparent";

  return (
    <li
      className={`${baseStyles} ${textColor} ${bgColor} hover:bg-white flex items-center  `}
      onClick={onClickHandler}
    >
      <div className='col-span-1 sm:col-span-4 items-center flex w-full gap-2 sm:gap-4'>
        <CheckboxTodo
          key={id}
          checked={!is_active}
          onChange={() => handleToggle(id, is_active)}
          title={title}
        />
      </div>

      <TodosItemStatusOfImportance priority={priority} />

      <div className='flex sm:shrink-0 items-center  gap-1 w-full pl-1 xl:pl-4 h-full'>
        <p className='hidden sm:flex items-center text-center  flex-1 basis-0'>
          {(deadline && formatFullDate(deadline)) || ""}
        </p>

        {/* Short date (MM.YYYY), shown only on small screens */}
        <p className='flex sm:hidden items-center  flex-1 pl-2 basis-0'>
          {(deadline && formatShortDate(deadline)) || ""}
        </p>
      </div>
    </li>
  );
};
