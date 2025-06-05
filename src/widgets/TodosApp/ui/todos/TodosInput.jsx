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
      <form
        onSubmit={handleSubmit}
        className=' sm:mb-[30px] sm:static fixed bottom-0 left-0 right-0 z-50  px-2 py-2'
      >
        <div className='flex justify-between w-full items-center relative px-3 rounded-[5px] bg-[#ECF7FF] shadow-[0px_2px_10px_rgba(0,0,0,0.1)]'>
          <div className='flex items-center w-full gap-[15px]'>
            <button className='flex justify-center items-center' type='submit'>
              <PlusIcon className='w-[17px] h-[17px]' />
            </button>
            <label className='flex items-center gap-2 py-3 cursor-pointer w-full'>
              <input
                type='text'
                placeholder='Добавить задачу'
                className='focus:outline-none w-full bg-transparent'
                ref={inputRef}
                maxLength={100}
                {...props}
              />
            </label>
          </div>

          <button className='flex items-center rounded-[5px] p-[0_12px] gap-[5px] bg-[#000] absolute right-[4px] top-[4px] bottom-[4px]'>
            <AiIcon />
            <h5 className='text-[#E6FF26] uppercase'>ai</h5>
          </button>
        </div>
      </form>
    </>
  );
};
