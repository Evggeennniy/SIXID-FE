export const TodosList = ({ children }) => {
  return (
    <>
      <div className='w-full mx-auto text-[#A4A4A4] '>
        {/* Table headers */}
        <div className='grid grid-cols-[minmax(9.375rem,400px)_40px_20%] sm:grid-cols-6 w-full gap-2 sm:gap-4  capitalize text-[#A4A4A4] pb-2 mb-2'>
          {/* Only this one will shrink and show ellipsis with tooltip */}
          <div className='col-span-1 sm:col-span-4 min-w-0 '>
            <div
              className='truncate whitespace-nowrap text-base font-medium'
              title='Назва'
            >
              Название
            </div>
          </div>

          {/* These will not shrink or truncate */}
          <div className=' col-span-1 text-base font-medium min-w-full'>
            <div className='whitespace-nowrap hidden sm:block'>Важность</div>
            <div className='whitespace-nowrap block sm:hidden'>Важн.</div>
          </div>
          <div className='col-span-1 text-base font-medium min-w-full'>
            <div className='whitespace-nowrap hidden sm:block'>Дедлайн</div>
          </div>
        </div>

        {children}
      </div>
    </>
  );
};
