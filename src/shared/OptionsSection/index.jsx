import { useRef, useState, useEffect } from "react";
import clsx from "clsx";

export const OptionsSection = ({
  children,
  className,
  open,
  onClose,
  ...props
}) => {
  const startYRef = useRef(null);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const defaultHeight = 600;

  // Detect if screen is mobile
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setDragY(0);
      setIsDragging(false);
    }
  }, [open]);

  // Start drag
  const handleStart = (e) => {
    if (!isMobile) return;
    setIsDragging(true);
    const clientY = e.touches?.[0]?.clientY ?? e.clientY;
    startYRef.current = clientY;
  };

  // On drag
  const handleMove = (e) => {
    if (!isDragging || !isMobile) return;
    const currentY = e.touches?.[0]?.clientY ?? e.clientY;
    const deltaY = currentY - startYRef.current;
    if (deltaY > 0) {
      setDragY(deltaY);
    }
  };

  // End drag
  const handleEnd = () => {
    if (dragY > 40 && isMobile) {
      onClose();
    }
    setIsDragging(false);
    setDragY(0);
  };

  const computedHeight =
    open && !isDragging
      ? `${defaultHeight}px`
      : open && isDragging
      ? `${Math.max(defaultHeight - dragY, 60)}px`
      : "0rem";
  return (
    <section
      className={clsx(
        "rounded-[1.25rem] shadow-[0_0_.625rem_0_#dbdaf0] overflow-hidden bg-white select-none",

        // Анимация на max-height, padding и opacity
        "transition-[max-height,padding,opacity] duration-500",
        "ease-[cubic-bezier(0.4, 0, 0.2, 1)]",

        // Позиционирование и размеры
        "fixed bottom-0 left-0 w-full z-50 rounded-t-[1.25rem]",
        "md:static md:bg-transparent md:rounded-[1.25rem]",
        "md:flex-[1_1_30%] lg:flex-[1_1_20%]",

        // Открытое/закрытое состояние
        open
          ? " max-h-[100vh] opacity-100 pointer-events-auto"
          : "p-0 max-h-0 opacity-0 pointer-events-none",

        className
      )}
      style={
        isMobile
          ? {
              height: computedHeight,
              transition: isDragging ? "none" : "height 0.3s ease",
            }
          : undefined
      }
      {...props}
    >
      <div
        className='w-full p-6 reletive md:hidden'
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        <div className='absolute w-12 top-0 left-1/2 transform -translate-1/2 h-1.5 rounded-full bg-[#D1D1D1] mx-auto my-3 md:hidden cursor-pointer touch-none' />
      </div>

      <div className='overflow-y-auto max-h-[100vh] h-full'>{children}</div>
    </section>
  );
};

//   children,
//   className,
//   open,
//   onClose,
//   ...props
// }) => {
//   return (
//     <section
//       className={clsx(
//         "bg-white shadow-[0_0_.625rem_0_#dbdaf0] transition-all duration-300 ease-in-out",

//         "fixed bottom-0 left-0 w-full z-50 rounded-t-[1.25rem]",

//         "md:static md:rounded-[1.25rem] md:bg-transparent md:h-auto md:w-auto",

//         "md:origin-right",

//         open
//           ? "translate-y-0 opacity-100 pointer-events-auto"
//           : "translate-y-full opacity-0 pointer-events-none",

//         "md:transition-transform md:duration-300 md:ease-in-out",
//         open
//           ? "md:scale-x-100 md:opacity-100 md:pointer-events-auto"
//           : "md:scale-x-0 md:opacity-0 md:pointer-events-none",

//         "md:flex-[1_1_30%] lg:flex-[1_1_20%]",

//         className
//       )}
//       {...props}
//     >
//       {/* Drag handle (mobile only) */}
//       <div
//         onClick={onClose}
//         className='w-12 h-1.5 rounded-full bg-gray-300 mx-auto my-3 md:hidden cursor-pointer'
//       />

//       {/* Scrollable container */}
//       <div
//         className={clsx(
//           "transition-all duration-300",
//           open
//             ? "p-[1.25rem] max-h-[100vh] h-full overflow-y-auto"
//             : "p-0 max-h-0 overflow-hidden"
//         )}
//       >
//         {children}
//       </div>
//     </section>
//   );
// };
