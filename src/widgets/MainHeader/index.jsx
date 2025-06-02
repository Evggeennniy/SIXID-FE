import { useUIStore } from "@shared/store/ui-store";

import Logotype from "@assets/svg/logotype.svg?react";
import MenuIcon from "@assets/svg/menu-icon.svg?react";
import SearchIcon from "@assets/svg/search-icon.svg?react";
import ChevronDown from "@assets/svg/chevronDown.svg?react";
import avatarImage from "@assets/images/avatarIcon.png";
export const MainHeader = () => {
  const toggleNav = useUIStore((state) => state.toggleNav);

  return (
    <div className='flex content-between items-center gap-[20px] mb-[30px]'>
      <Logotype className='w-[30px] h-[30px] block sm:hidden ' />
      <div className='flex w-full gap-[10%]'>
        <div className='flex content-between items-center pr-3 flex-1 border-[2px] border-[#dad8d8] rounded-[12px]  '>
          <label className='inline-flex items-center px-2 py-3 gap-2 w-full cursor-pointer'>
            <input
              type='text'
              className='focus:outline-none px-1 w-full'
              placeholder='Поиск...'
            />
          </label>

          <SearchIcon className='transition duration-100 ease-in-out active:scale-[90%] cursor-pointer w-[25px] h-[25px]' />
        </div>

        <div className=' hidden  sm:flex items-center gap-2 px-3 py-1.5 rounded-md w-fit'>
          <div className='flex flex-col justify-center'>
            <div className='flex items-center gap-2'>
              <div className=' flex flex-col '>
                <span className='text-sm font-medium text-[#4A4A4A]'>
                  Євгеній Павлов
                </span>
                <span className='text-xs text-[#A4A4A4]'>Мой профиль</span>
              </div>

              <ChevronDown className='w-4 h-4 text-gray-500' />
            </div>
          </div>
          <img
            src={avatarImage}
            alt='User Avatar'
            className='w-10 h-10 rounded-full object-cover'
          />
        </div>
      </div>

      <MenuIcon
        className='w-[30px] h-[30px] cursor-pointer block sm:hidden'
        onClick={toggleNav}
      />
    </div>
  );
};
