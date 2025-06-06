function CheckboxTodo({ checked, onChange, title, className = "" }) {
  return (
    <div className={`flex items-center w-full gap-2 ${className}`}>
      <label className='relative flex items-center gap-1 py-3 px-2 cursor-pointer bg-[#ECF7FF] rounded'>
        <input
          type='checkbox'
          checked={checked}
          onChange={onChange}
          onClick={(e) => e.stopPropagation()}
          className='absolute w-5 h-5 opacity-0 cursor-pointer'
        />
        <span
          className={`w-5 h-5 rounded border border-gray-300 flex items-center justify-center ${
            checked ? "bg-[#A8A5FF]" : "bg-[#ECF7FF]"
          }`}
        >
          {checked && (
            <svg
              className='w-4 h-4 text-white'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M5 13l4 4L19 7'
              />
            </svg>
          )}
        </span>
      </label>
      <h5 className='break-words min-w-0 leading-normal w-full'>{title}</h5>
    </div>
  );
}

export default CheckboxTodo;
