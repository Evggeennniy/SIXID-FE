function DropdownContent({ children, open, isInline = false }) {
  if (isInline) {
    // Inline flow: no absolute, push content below
    return open ? (
      <div className='min-w-full flex flex-col items-start mt-2 rounded-2xl max-h-dvh scrollbar-none justify-start dropdown-animation-inline'>
        {children}
      </div>
    ) : null;
  }

  // Default: absolutely positioned dropdown with animation
  return (
    <div
      className={`absolute min-w-full flex flex-col items-start mt-4 rounded-2xl max-h-dvh scrollbar-none justify-start dropdown-animation ${
        open
          ? "transform opacity-100 translate-y-0 z-20"
          : "transform translate-y-[-20%] opacity-0 -z-10"
      }`}
    >
      {children}
    </div>
  );
}

export default DropdownContent;
