import { useState, useEffect, useRef } from "react";

function CheckboxTodo({
  checked,
  onChange,
  title,
  onTitleChange,
  className = "",
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const inputRef = useRef(null);

  useEffect(() => {
    setDraftTitle(title);
  }, [title]);

  useEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.focus();
  }, [isEditing]);

  const finishEditing = () => {
    setIsEditing(false);
    if (draftTitle !== title && onTitleChange) {
      onTitleChange(draftTitle);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      finishEditing();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setDraftTitle(title);
      setIsEditing(false);
    }
  };

  return (
    <div className={`flex items-center w-full gap-2 ${className}`}>
      <label className='relative flex items-center gap-1 py-3 px-2 cursor-pointer bg-transparent rounded'>
        <input
          type='checkbox'
          checked={checked}
          onChange={onChange}
          onClick={(e) => e.stopPropagation()}
          className='absolute w-5 h-5 opacity-0 cursor-pointer'
        />
        <span
          className={`w-5 h-5 rounded border border-gray-300 flex items-center justify-center ${
            checked ? "bg-[#A8A5FF]" : "bg-[#ECF7FF]"
          }`}
        >
          {checked && (
            <svg
              className='w-4 h-4 text-white'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M5 13l4 4L19 7'
              />
            </svg>
          )}
        </span>
      </label>

      {isEditing ? (
        <input
          ref={inputRef}
          value={draftTitle}
          onChange={(e) => setDraftTitle(e.target.value)}
          onBlur={finishEditing}
          onKeyDown={onKeyDown}
          className='w-full text-black rounded px-1 py-0.5 outline-none'
        />
      ) : (
        <h5
          onClick={() => setIsEditing(true)}
          className='break-words min-w-0 leading-normal w-full cursor-text'
          title={title}
        >
          {title}
        </h5>
      )}
    </div>
  );
}

export default CheckboxTodo;
