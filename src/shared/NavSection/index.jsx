import clsx from "clsx";
import { useIsMobile } from "../../hooks/useMobile";
import { useRef } from "react";
import { useUIStore } from "@shared/store/ui-store";

export const NavSection = ({ children, className, ...props }) => {
  const backdropRef = useRef(null);
  const isNavOpen = useUIStore((state) => state.isNavOpen);
  const toggleNav = useUIStore((state) => state.toggleNav);
  const isMobile = useIsMobile();

  const handleClickOutside = (e) => {
    if (e.target === backdropRef.current) {
      toggleNav();
    }
  };

  // Render with backdrop only on mobile
  if (isMobile) {
    return (
      <div
        ref={backdropRef}
        onClick={handleClickOutside}
        className={clsx(
          "fixed inset-0 z-[999] flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out",
          isNavOpen
            ? "bg-black/30 backdrop-blur-sm opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='#FFFFFF'
          className='size-6 absolute -z-1 right-6 top-3 cursor-pointer'
          onClick={toggleNav}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6 18 18 6M6 6l12 12'
          />
        </svg>

        <section
          className={clsx(
            "transform transition-transform duration-300 ease-in-out",
            "xl:basis-[20%] max-w-[80%] sm:max-w-[15%] w-full min-h-[90vh] bg-[#EFF7FF] xl:max-w-[15%] xl:flex-none",
            "p-[20px] lg:p-[20px]",
            "absolute top-0 bottom-0 sm:static left-0",
            "rounded-tr-[20px] rounded-br-[20px]  shadow",
            "overflow-y-auto scrollbar-left",
            isNavOpen ? "translate-x-0" : "-translate-x-full",
            className
          )}
          {...props}
        >
          {children}
        </section>
      </div>
    );
  }

  // On larger screens, render section only (no backdrop)
  return (
    <section
      className={clsx(
        "xl:basis-[20%] max-w-[80%] sm:max-w-[15%] w-full z-[999] min-h-[90vh] bg-[#EFF7FF] xl:max-w-[15%] xl:flex-none",
        "p-[10px] lg:p-[20px]",
        "rounded-[20px] shadow-[0_0_10px_0_#dbdaf0]",
        "overflow-y-auto scrollbar-left",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};
