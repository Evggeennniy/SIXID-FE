import TodosItemStatusOfImportance from "../todos/TodosItemStatusOfImportance";
import {
  changeTodosAction,
  selectActiveTodoItem,
  setTodoItemStatusOfImportantce,
} from "../../../../redux/slice/todos/todosSlice";
import { useDispatch, useSelector } from "react-redux";

function SingleSelectOptions({ options }) {
  const { activeTodo } = useSelector((state) => {
    const activeTodo = state.todos.todosList.find(
      (todo) => todo.id === selectActiveTodoItem(state)
    );

    return { activeTodo };
  });
  const dispatch = useDispatch();
  console.log(activeTodo);

  const handleSelect = (value) => {
    dispatch(
      setTodoItemStatusOfImportantce({
        id: activeTodo?.id,
        priority: value,
      })
    );

    dispatch(
      changeTodosAction({
        id: activeTodo?.id,
        data: { priority: value },
      })
    );
  };

  return (
    <ul className='flex flex-col gap-2 pl-1'>
      {options.map((option) => (
        <li key={option.value}>
          <label className='flex items-center gap-1  cursor-pointer '>
            <input
              type='radio'
              name='single-select'
              value={option.value}
              checked={activeTodo?.priority === option.value}
              onChange={() => handleSelect(option.value)}
              className='appearance-none w-4 h-4 border-2 border-[#A4A4A4]  rounded-full checked:bg-[#5E5E5E] checked:border-[#A8A5FF] transition-all duration-200 cursor-pointer'
            />
            <span>
              <TodosItemStatusOfImportance priority={option.value} />
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}
export default SingleSelectOptions;
