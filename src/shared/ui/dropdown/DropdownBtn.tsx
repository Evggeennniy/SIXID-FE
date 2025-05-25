function DropdownBtn({
  children,
  open,
  toggle,
  icon,
  rightIcon,
  rightIconPosition = "right",
  usePlusIcon = false, // new prop for plus/arrow toggle
  plusIcon, // optional custom plus icon
  className,
}) {
  // Default plus icon if none passed
  const DefaultPlusIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='w-5 h-5 fill-[#5E5E5E80]'
      viewBox='0 0 24 24'
      stroke='none'
    >
      <path
        d='M12 5v14m-7-7h14'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        stroke='currentColor'
      />
    </svg>
  );

  // Default arrow icon
  const DefaultArrowIcon = (
    <svg
      viewBox='0 0 448 512'
      xmlns='http://www.w3.org/2000/svg'
      className='fill-[#5E5E5E80] w-4 h-4 mt-[.125rem]'
      stroke='none'
    >
      <path
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        stroke='currentColor'
        d='M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z'
      />
    </svg>
  );

  // Determine which icon to show on right:
  // If usePlusIcon is true, show plus icon when closed and arrow when open
  // Else show rightIcon or default arrow always rotating

  const iconToShow = usePlusIcon
    ? open
      ? rightIcon || DefaultArrowIcon
      : plusIcon || DefaultPlusIcon
    : rightIcon || DefaultArrowIcon;

  return (
    <button
      onClick={toggle}
      className={`flex items-center w-full rounded-2xl bg-btn-color shadow-dropdown-btn-shadow transition-shadow duration-300 ease-in-out cursor-pointer px-2 py-2 gap-2 z-40 relative ${className}`}
    >
      {icon && <span className='flex items-center'>{icon}</span>}

      {/* Text and right icon inline if rightIconPosition is "inline" */}
      <span className='flex-1 text-left w-full flex items-center gap-1'>
        {children}
        {rightIconPosition === "inline" && (
          <span
            className={`transition-transform duration-300 ${
              open ? "-rotate-180" : "rotate-0"
            } flex gap-1 justify-center items-center pt-1`}
          >
            {iconToShow}
          </span>
        )}
      </span>

      {/* Right icon at the far right if rightIconPosition is "right" (default) */}
      {rightIconPosition === "right" && (
        <span
          className={`transition-transform duration-300 ${
            open ? "-rotate-180" : "rotate-0"
          }`}
        >
          {iconToShow}
        </span>
      )}
    </button>
  );
}

export default DropdownBtn;
