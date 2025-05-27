export const TodosList = ({ children }) => {
  return (
    <>
      <div className='w-full mx-auto text-[#A4A4A4] '>
        {/* Table headers */}
        <div className='grid grid-cols-4 lg:grid-cols-6 w-full gap-2 lg:gap-4  capitalize text-[#A4A4A4] pb-2 mb-2'>
          {/* Only this one will shrink and show ellipsis with tooltip */}
          <div className='col-span-2 lg:col-span-4 min-w-0 '>
            <div
              className='truncate whitespace-nowrap text-base font-medium'
              title='Назва'
            >
              Назва
            </div>
          </div>

          {/* These will not shrink or truncate */}
          <div className=' col-span-1 text-base font-medium min-w-full'>
            <div className='whitespace-nowrap'>Важливість</div>
          </div>
          <div className='col-span-1 text-base font-medium min-w-full'>
            <div className='whitespace-nowrap'>Дата</div>
          </div>
        </div>

        {children}
      </div>
    </>
  );
};
