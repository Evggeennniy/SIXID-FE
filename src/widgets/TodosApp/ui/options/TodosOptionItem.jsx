import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTodosOptionItems,
  updateSubtaskAction,
} from "../../../../redux/slice/todos/todosSlice";

function TodosOptionItem({ title, taskId, id }) {
  const dispatch = useDispatch();
  const subtask = useSelector((state) =>
    selectTodosOptionItems(state, taskId)
  )?.find((item) => item.id === id);

  console.log(subtask, subtask?.is_active !== true);

  function onChange() {
    dispatch(
      updateSubtaskAction({
        taskId,
        is_active: subtask.is_active === false,
        id,
      })
    );
  }

  return (
    <li className='flex justify-start items-center w-full '>
      <label className='inline-flex items-center px-2 py-1 gap-2 cursor-pointer'>
        <input
          type='checkbox'
          name='is_done'
          checked={subtask?.is_active !== true}
          onChange={onChange}
          className='appearance-none  w-4 h-4 border-2 border-[#A4A4A4] rounded-full checked:bg-[#5E5E5E] checked:border-[#A8A5FF] transition-all duration-200'
        />
      </label>
      <h5
        className='leading-normal line-clamp-2 text-ellipsis overflow-hidden break-words w-full'
        title={title}
      >
        {title}
      </h5>
    </li>
  );
}

export default TodosOptionItem;
