import PlusIcon from "@assets/svg/plus-icon.svg?react";
import AiIcon from "@assets/svg/ai-icon.svg?react";
import { useRef } from "react";

export const TodosInput = ({ onSubmit, ...props }) => {
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.blur();
    }
    onSubmit(e);
  }
  return (
    <>
      <form onSubmit={handleSubmit} className='mb-[1.875rem] '>
        <div className='flex justify-between w-full items-center relative px-3  rounded-[.3125rem] bg-[#ECF7FF] shadow-[0rem_.125rem_.625rem_rgba(0,0,0,0.1)]'>
          <div className='flex items-center w-full gap-[.9375rem]'>
            <button className='flex justify-center items-center' type='submit'>
              <PlusIcon className='w-[1.0625rem] h-[1.0625rem]' />
            </button>
            <label className='flex items-center gap-2 py-3 cursor-pointer w-full'>
              <input
                type='text'
                placeholder='Добавить задачу'
                className='focus:outline-none w-full'
                ref={inputRef}
                {...props}
              />
            </label>
          </div>

          <button className='flex items-center rounded-[.3125rem] p-[0_.75rem] gap-[.3125rem] bg-[#000] absolute right-[.25rem] top-[.25rem] bottom-[.25rem]'>
            <AiIcon />
            <h5 className='text-[#E6FF26] uppercase'>ai</h5>
          </button>
        </div>
        {/* <p
          className={`${
            messageHasError ? "opacity-100" : "opacity-0"
          } text-red-400 pl-3 `}
        >
          Поле должно быть не пустым.
        </p> */}
      </form>
    </>
  );
};
