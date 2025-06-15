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
      <div className="bg-[#ECF7FF] flex content-between items-center gap-[20px] mb-[20px] sm:mb-[30px]">
        <Logotype className="w-[30px] h-[30px] block sm:hidden" />
        <form
          onSubmit={onsubmit}
          className="flex w-full gap-[10%] bg-[#ECF7FF]"
        >
          <div className="flex content-between items-center pr-3 flex-1 border-[2px] border-[#dad8d8] rounded-[12px]  ">
            <label className="inline-flex items-center px-2 p-[7px] lg:py-3 gap-2 w-full cursor-pointer">
              <input
                type="text"
                className="focus:outline-none px-1 w-full"
                placeholder="Поиск..."
              />
            </label>
            <SearchIcon className="transition duration-100 ease-in-out active:scale-[90%] cursor-pointer w-[25px] h-[25px]" />
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md shadow w-fit">
            <ProfileButton />
          </div>
        </form>
        <MenuIcon
          className="w-[30px] h-[30px] cursor-pointer block sm:hidden"
          onClick={toggleNav}
        />
      </div>
    </div>
  );
};
