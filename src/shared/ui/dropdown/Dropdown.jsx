import { useState } from "react";
import DropdownContent from "./DropdownContent";
import DropdownBtn from "./DropdownBtn";

function Dropdown({
  btnText,
  icon,
  rightIcon,
  rightIconPosition = "right",
  usePlusIcon = false,
  plusIcon,
  className = "",
  children,
  replaceIcon = false,
  replacerIcon = null,
  isInlineContent = false,
  ...restProps // catch all other props
}) {
  const [open, setOpen] = useState(false);
  const toggleDropdown = () => setOpen((prev) => !prev);

  return (
    <div className={`relative ${className}`} {...restProps}>
      <DropdownBtn
        open={open}
        toggle={toggleDropdown}
        replaceIcon={replaceIcon}
        replacerIcon={replacerIcon}
        icon={icon}
        rightIcon={rightIcon}
        rightIconPosition={rightIconPosition}
        usePlusIcon={usePlusIcon}
        plusIcon={plusIcon}
        className={className}
      >
        {btnText}
      </DropdownBtn>
      <DropdownContent open={open} isInline={isInlineContent}>
        {children}
      </DropdownContent>
    </div>
  );
}

export default Dropdown;
