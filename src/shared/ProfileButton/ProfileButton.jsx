import React from "react";
import ChevronDown from "@assets/svg/chevronDown.svg?react";
import avatarImage from "@assets/images/avatarIcon.png";
function ProfileButton() {
  return (
    <>
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
    </>
  );
}

export default ProfileButton;
