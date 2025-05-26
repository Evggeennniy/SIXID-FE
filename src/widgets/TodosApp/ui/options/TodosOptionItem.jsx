import React from "react";

function TodosOptionItem({ title }) {
  return (
    <li className='flex justify-start items-center w-full gap-2 '>
      <label className='inline-flex items-center  cursor-pointer'>
        <input
          type='checkbox'
          name='is_done'
          className='appearance-none  w-4 h-4 border-2 border-[#A4A4A4] rounded-full checked:bg-[#5E5E5E] checked:border-[#A8A5FF] transition-all duration-200'
        />
      </label>
      <h5 className='leading-normal w-full'>{title}</h5>
    </li>
  );
}

export default TodosOptionItem;
