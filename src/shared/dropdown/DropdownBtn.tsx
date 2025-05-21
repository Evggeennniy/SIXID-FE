function DropdownBtn({ btnText, open, toggle }) {
  return (
    <button
      onClick={toggle}
      className={`flex relative z-40 items-center w-full  bg-btn-color rounded-2xl shadow-dropdown-btn-shadow justify-start transition-shadow duration-300 ease-in-out cursor-pointer ${
        open ? "" : null
      } `}
    >
      {btnText}
      <span
        className={`flex items-center justify-center transition-all delay-200 ml-2 ${
          open ? "-rotate-180 " : null
        } `}
      >
        <svg
          viewBox='0 0 448 512'
          xmlns='http://www.w3.org/2000/svg'
          className='fill-[#5E5E5E80] w-3 h-3 mt-2'
        >
          <path d='M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z' />
        </svg>
      </span>
    </button>
  );
}

export default DropdownBtn;
