import TodosItemDeadLine from "@widgets/TodosApp/ui/TodosItemDeadLine.jsx";
import TodosItemStatusOfImportance from "./TodosItemStatusOfImportance";

export const TodosItem = ({
  title,
  deadline,
  statusOfImportant,
  isActive,
  onClick,
  isComplete,
}) => {
  return (
    <>
      {!isComplete && (
        <li
          className={`grid grid-cols-6 items-start text-[#5E5E5E] gap-[.9375rem] p-[.8125rem]
          ${isActive ? "bg-white" : "bg-transparent"}
          hover:bg-white cursor-pointer transition-colors duration-200`}
          onClick={onClick}
        >
          <div className='col-span-4 flex gap-4'>
            <input type='checkbox' name='is_done' />
            <h5 className='leading-normal'>{title}</h5>
          </div>
          <TodosItemStatusOfImportance statusOfImportant={statusOfImportant} />
          <TodosItemDeadLine deadline={deadline} />
        </li>
      )}
      {isComplete && (
        <li
          className={`grid grid-cols-6 items-start text-[#A4A4A4]  gap-[.9375rem] p-[.8125rem]
          ${isActive ? "bg-white" : "bg-transparent"}
          hover:bg-white cursor-pointer transition-colors duration-200`}
          onClick={onClick}
        >
          <div className='col-span-4 flex gap-4'>
            <input
              type='checkbox'
              checked={true}
              name='is_done'
              className='accent-[#A8A5FF]'
            />
            <h5 className='leading-normal '>{title}</h5>
          </div>
          <TodosItemStatusOfImportance statusOfImportant={statusOfImportant} />
          <TodosItemDeadLine deadline={deadline} />
        </li>
      )}
    </>
  );
};
