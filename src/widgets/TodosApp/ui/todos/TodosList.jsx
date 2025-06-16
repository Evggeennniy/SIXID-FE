export const TodosList = ({ children }) => {
  return (
    <>
      <div className='w-full mx-auto text-[#A4A4A4] max-h-full sm:max-h-[65%] hide-scrollbar '>
        {/* Table headers */}

        {children}
      </div>
    </>
  );
};
