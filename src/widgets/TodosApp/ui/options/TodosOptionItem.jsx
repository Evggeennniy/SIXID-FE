import { useState } from "react";
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

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(title);

  function onChangeCheckbox() {
    dispatch(
      updateSubtaskAction({
        taskId,
        is_active: subtask.is_active === false,
        id,
      })
    );
  }

  function handleTitleClick() {
    setIsEditing(true);
  }

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  function saveTitle() {
    if (inputValue.trim() !== "" && inputValue !== title) {
      // Dispatch an update action for title here
      dispatch(
        updateSubtaskAction({
          taskId,
          id,
          title: inputValue.trim(), // assuming your reducer can handle title update
        })
      );
    }
    setIsEditing(false);
  }

  function handleInputKeyDown(e) {
    if (e.key === "Enter") {
      saveTitle();
    } else if (e.key === "Escape") {
      setInputValue(title); // reset input on Escape
      setIsEditing(false);
    }
  }

  return (
    <li className='flex justify-start items-center w-full gap-2'>
      <label className='inline-flex items-center px-2 py-1 gap-2 cursor-pointer'>
        <input
          type='checkbox'
          name='is_done'
          checked={subtask?.is_active !== true}
          onChange={onChangeCheckbox}
          className='appearance-none w-4 h-4 border-2 border-[#A4A4A4] rounded-full checked:bg-[#5E5E5E] checked:border-[#A8A5FF] transition-all duration-200'
        />
      </label>

      {isEditing ? (
        <input
          type='text'
          className='w-full     rounded focus:outline-none'
          value={inputValue}
          onChange={handleInputChange}
          onBlur={saveTitle}
          onKeyDown={handleInputKeyDown}
          autoFocus
        />
      ) : (
        <h5
          className='leading-normal line-clamp-2 text-ellipsis overflow-hidden break-words w-full cursor-text'
          title={title}
          onClick={handleTitleClick}
        >
          {title}
        </h5>
      )}
    </li>
  );
}

export default TodosOptionItem;
