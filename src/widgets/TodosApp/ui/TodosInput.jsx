import PlusIcon from "@assets/svg/plus-icon.svg?react";
import AiIcon from "@assets/svg/ai-icon.svg?react";

export const TodosInput = ({ ...props }) => {
  return (
    <div className="flex justify-between items-center relative p-[13px_10px] mb-[30px] rounded-[5px] bg-[#ECF7FF] shadow-[0px_2px_10px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-[15px]">
        <PlusIcon className="w-[17px] h-[17px]" />
        <input
          type="text"
          placeholder="Добавить задачу"
          className="focus:outline-none"
          {...props}
        />
      </div>
      <button className="flex items-center rounded-[5px] p-[0_12px] gap-[5px] bg-[#000] absolute right-[4px] top-[4px] bottom-[4px]">
        <AiIcon />
        <h5 className="text-[#E6FF26] uppercase">ai</h5>
      </button>
    </div>
  );
};
