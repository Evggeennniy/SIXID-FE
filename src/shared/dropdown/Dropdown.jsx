"use client";

import { useState } from "react";

import DropdownContent from "./DropdownContent";
import DropdownBtn from "./DropdownBtn";

function Dropdown({ btnText, children }) {
  const [open, setOpen] = useState(false);
  const toggleDropdown = () => setOpen((prev) => !prev);

  return (
    <div className='relative'>
      <DropdownBtn btnText={btnText} open={open} toggle={toggleDropdown} />
      <DropdownContent open={open}>{children}</DropdownContent>
    </div>
  );
}

export default Dropdown;
