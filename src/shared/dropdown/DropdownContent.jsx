function DropdownContent({ children, open }) {
  return (
    <div
      className={`absolute min-w-full flex flex-col items-center mt-4  rounded-2xl max-h-dvh  scrollbar-none  justify-center  dropdown-animation  ${
        open
          ? "transform opacity-100 translate-y-0 z-20"
          : "transform translate-y-[-20%] opacity-0 -z-10 "
      }`}
    >
      {children}
    </div>
  );
}

export default DropdownContent;
