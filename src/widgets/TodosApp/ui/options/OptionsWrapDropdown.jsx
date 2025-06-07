import Dropdown from "../../../../shared/ui/dropdown/Dropdown";
import OptionsDropdownIcon from "./OptionsDropdownIcon";

function OptionsWrapDropdown({
  children,
  icon,
  text,
  haveDorder = false,
  replaceIcon = false,
  replacerIcon = null,
}) {
  return (
    <div className={`${haveDorder ? "border-t  " : ""} py-2 border-[#E0E4FF]`}>
      <Dropdown
        btnText={<OptionsDropdownIcon icon={icon} text={text} />}
        className='text-[#A4A4A4]'
        replaceIcon={replaceIcon}
        replacerIcon={replacerIcon}
        usePlusIcon={true}
        isInlineContent={true}
      >
        <div className='text-[#5E5E5E] cursor-pointer transition-colors w-full '>
          {" "}
          {children}
        </div>
      </Dropdown>
    </div>
  );
}

export default OptionsWrapDropdown;
