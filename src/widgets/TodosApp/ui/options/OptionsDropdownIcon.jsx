import React from "react";

function OptionsDropdownIcon({ icon, text }) {
  return (
    <div className='flex justify-center items-center text-[#5E5E5E] gap-2 '>
      {icon}
      <p>{text}</p>
    </div>
  );
}

export default OptionsDropdownIcon;
