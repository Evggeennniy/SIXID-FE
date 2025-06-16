import OptionsWrapDropdown from "../../../TodosApp/ui/options/OptionsWrapDropdown";
import SubtasksIcon from "@assets/svg/subtasks.svg?react";
export default function SubtasksSection({
  inputValue,
  onInputChange,
  onInputBlur,
  onSubmit,
  subtasks,
}) {
  return (
    <OptionsWrapDropdown
      icon={<SubtasksIcon />}
      text={`Подзадачи (${subtasks.length || 0})`}
      haveDorder={true}
    >
      <div className='flex flex-col gap-2'>
        <form
          onSubmit={onSubmit}
          className='flex items-center rounded w-full p-3 shadow-[0_0_.625rem_rgba(0,0,0,0.1)]'
        >
          <button type='submit' className='p-1'>
            {/* Plus icon if needed */}
          </button>
          <input
            type='text'
            name='subtask_title'
            placeholder='Добавить подзадачу'
            className='focus:outline-none w-full'
            value={inputValue}
            onBlur={onInputBlur}
            onChange={onInputChange}
          />
        </form>
        <ul className='flex flex-col gap-2 p-1'>
          {subtasks.map((item) => (
            <TodosOptionItem
              key={item.id}
              title={item.title}
              taskId={item.taskId}
              id={item.id}
            />
          ))}
        </ul>
      </div>
    </OptionsWrapDropdown>
  );
}
