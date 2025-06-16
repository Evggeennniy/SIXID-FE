import clsx from "clsx";

export default function DayTasksList({
  tasks,
  activeTodoId,
  onSelect,
  onToggle,
}) {
  return (
    <section className='flex flex-col justify-center w-full gap-2'>
      {tasks?.map((item) => (
        <div
          key={item.id}
          className={clsx(
            "flex flex-col justify-center sm:flex-row sm:items-center gap-2 border border-[#E0E4FF] p-2 rounded-xl shadow w-full min-w-0",
            activeTodoId === item.id && "bg-[#E1F5FF]"
          )}
          onClick={() => onSelect(item.id)}
        >
          <div className='flex items-center w-full'>
            <label className='relative flex items-center gap-1 py-3 px-2 cursor-pointer bg-transparent rounded'>
              <input
                type='checkbox'
                checked={!item.is_active}
                onChange={() => onToggle(item.id, item.is_active)}
                onClick={(e) => e.stopPropagation()}
                className='absolute w-5 h-5 opacity-0 cursor-pointer'
              />
              <span
                className={`w-5 h-5 rounded border border-gray-300 flex items-center justify-center ${
                  !item.is_active ? "bg-[#A8A5FF]" : "bg-[#ECF7FF]"
                }`}
              >
                {!item.is_active && (
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
            <h5
              className='break-words text-[#5E5E5E] min-w-0 leading-normal w-full cursor-text'
              title={item.title}
            >
              {item.title}
            </h5>
          </div>
        </div>
      ))}
    </section>
  );
}
