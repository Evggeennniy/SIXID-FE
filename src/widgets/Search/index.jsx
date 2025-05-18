import { useUIStore } from "@shared/store/ui-store";

import Logotype from "@assets/svg/logotype.svg?react";
import MenuIcon from "@assets/svg/menu-icon.svg?react";
import SearchIcon from "@assets/svg/search-icon.svg?react";

export const Search = () => {
  const toggleNav = useUIStore((state) => state.toggleNav);

  return (
    <div className="flex content-between items-center gap-[20px]">
      <Logotype className="w-[30px] h-[30px] block sm:hidden " />
      <div className="flex content-between items-center flex-1 border-[2px] border-[#dad8d8] rounded-[12px] p-[7px_15px] ">
        <input
          type="text"
          className="focus:outline-none w-[100%]"
          placeholder="Поиск..."
        />
        <SearchIcon className="transition duration-100 ease-in-out active:scale-[90%] cursor-pointer w-[25px] h-[25px]" />
      </div>
      <MenuIcon
        className="w-[30px] h-[30px] cursor-pointer block sm:hidden"
        onClick={toggleNav}
      />
    </div>
  );
};
