import { useState } from "react";
import TodosItemStatusOfImportance from "../todos/TodosItemStatusOfImportance";

function SingleSelectOptions({ options, onSelect }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (value) => {
    setSelected(value);
    if (onSelect) onSelect(value);
  };

  return (
    <ul className='flex flex-col gap-2 pl-1'>
      {options.map((option) => (
        <li key={option.value}>
          <label className='flex items-center cursor-pointer '>
            <input
              type='radio'
              name='single-select'
              value={option.value}
              checked={selected === option.value}
              onChange={() => handleSelect(option.value)}
              className='appearance-none w-4 h-4 border-2 border-[#A4A4A4] rounded-full checked:bg-[#5E5E5E] checked:border-[#A8A5FF] transition-all duration-200'
            />
            <span>
              <TodosItemStatusOfImportance statusOfImportant={option.value} />
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}
export default SingleSelectOptions;
