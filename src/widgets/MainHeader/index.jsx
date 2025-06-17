import { useUIStore } from "@shared/store/ui-store";

import Logotype from "@assets/svg/logotype.svg?react";
import MenuIcon from "@assets/svg/menu-icon.svg?react";
import SearchIcon from "@assets/svg/search-icon.svg?react";
import ChevronDown from "@assets/svg/chevronDown.svg?react";
import ProfileButton from "../../shared/ProfileButton/ProfileButton";

export const MainHeader = () => {
  const toggleNav = useUIStore((state) => state.toggleNav);
  function onsubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="w-full bg-[#ECF7FF]">
      <div className="bg-[#ECF7FF] flex justify-between items-center gap-[20px] mb-[20px] sm:mb-[30px]">
        <Logotype className="w-[30px] h-[30px] block sm:hidden" />
        <form
          onSubmit={onsubmit}
          className="flex gap-[10%] rounded-[12px] bg-[#ECF7FF] flex-1"
        >
          <div className="flex gap-[10px] justify-between items-center max-w-[500px] w-full">
            <label className="inline-flex items-center p-[10px_15px] gap-2 w-full cursor-pointer rounded-[12px] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.10)]">
              <input
                type="text"
                className="focus:outline-none px-1 w-full"
                placeholder="Поиск..."
              />
            </label>
            <div className="transition duration-100 ease-in-out active:scale-[90%] h-full flex items-center rounded-[12px] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.10)] p-[0_10px]">
              <SearchIcon className="cursor-pointer w-[25px] h-[25px]" />
            </div>
          </div>
        </form>
        <div className="hidden sm:flex items-center gap-2 py-1.5 rounded-md">
          <ProfileButton />
        </div>
        <MenuIcon
          className="w-[30px] h-[30px] cursor-pointer block sm:hidden"
          onClick={toggleNav}
        />
      </div>
    </div>
  );
};
