export const TodosList = ({ children }) => {
  return (
    <>
      <div className='w-full mx-auto text-[#A4A4A4] p-2'>
        {/* Заголовоки таблицы */}
        <div className='grid grid-cols-6 gap-4 capitalize  text-[#A4A4A4] pb-2 mb-2'>
          <h5 className={"col-span-4"}>Назва</h5>
          <h5>Важливість</h5>
          <h5>Дата</h5>
        </div>
        {children}
      </div>
    </>
  );
};
