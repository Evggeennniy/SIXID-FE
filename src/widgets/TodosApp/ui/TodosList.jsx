export const TodosList = ({ children }) => {
  return (
    <div className="">
      <h5 className="capitalize text-[#A4A4A4] mb-[15px]">назва</h5>
      <ul>{children}</ul>
    </div>
  );
};
