import React from "react";
import { OptionsSection } from "../../../shared/OptionsSection";
import { useInput } from "../../../hooks/useInput";
import { isNotEmpty } from "../../../util/validation";
import PlusIcon from "@assets/svg/plus-icon.svg?react";
import { useUIStore } from "../../../shared/store/ui-store";
import clsx from "clsx";
function TodosOptions() {
  const {
    value: messageValue,
    handleInputBlur: handleMessageBlur,
    handleInputChange: handleMessageChange,
    hasError: messageHasError,
  } = useInput("", (value) => isNotEmpty(value));

  function onSubmit(e) {
    e.preventDefault();
    if (!isNotEmpty(messageValue)) {
      handleMessageBlur();
      return;
    }
  }
  const isOptionsOpen = useUIStore((state) => state.isOptionsOpen);
  console.log(isOptionsOpen);
  return (
    <OptionsSection
      className={clsx(
        isOptionsOpen
          ? "opacity-100 max-w-[400px] translate-x-0 pointer-events-auto"
          : "opacity-0 max-w-0 translate-x-0 pointer-events-none"
      )}
    >
      <section className='flex flex-col justify-center  w-full gap-5'>
        <div className='flex gap-4 border border-[#A4A4A4] p-4 rounded-xl shadow'>
          <input type='checkbox' name='is_done' />
          <h5 className='leading-normal'></h5>
        </div>

        <div className='flex flex-col text-[#5E5E5E] '>
          <h5 className={"text-[#A4A4A4] mb-2"}>Подзадачи</h5>
          <div className='flex flex-col justify-start   border border-[#A4A4A4] p-2 rounded-xl shadow'>
            {/* list of subtasks */}
            <ul className='flex flex-col gap-1 p-1'>
              <li className='flex gap-2 '>
                <label className='inline-flex items-center cursor-pointer'>
                  <input
                    type='checkbox'
                    name='is_done'
                    className='appearance-none w-4 h-4 border-2 border-[#A4A4A4] rounded-full checked:bg-[#5E5E5E] checked:border-[#A8A5FF] transition-all duration-200'
                  />
                </label>
                <h5 className='leading-normal'></h5>
              </li>
            </ul>

            <form
              onSubmit={onSubmit}
              className='flex justify-start items-center'
            >
              <button
                type='submit'
                className='flex justify-center items-center p-1 '
              >
                <PlusIcon className='w-[1.0625rem] h-[1.0625rem]' />
              </button>
              <input
                type='text'
                name='is_done'
                placeholder='Добавить подзадачу'
                className={`focus:outline-none focus:ring-0`}
                value={messageValue}
                onBlur={handleMessageBlur}
                onChange={handleMessageChange}
              />
            </form>
          </div>
          <p
            className={`${
              messageHasError ? "opacity-100" : "opacity-0"
            } text-red-400 pl-3 `}
          >
            Поле должно быть не пустым.
          </p>
          <h5 className='leading-normal'></h5>
        </div>
      </section>
    </OptionsSection>
  );
}

export default TodosOptions;
