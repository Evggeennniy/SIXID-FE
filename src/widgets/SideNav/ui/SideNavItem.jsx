import clsx from "clsx";

import { useNavigate, useLocation } from "react-router-dom";
import { useUIStore } from "@shared/store/ui-store";

export const SideNavItem = ({ Icon, label, to, className, ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isNavOpen = useUIStore((state) => state.isNavOpen);
  const toggleNav = useUIStore((state) => state.toggleNav);

  const isActive = location.pathname === to;

  return (
    <li className="relative">
      <button
        className={clsx(
          "flex items-center p-[5px_0] gap-[10px] w-full transition duration-100 ease-in-out active:scale-[95%] relative z-10",
          isActive && "border-[#A8A5FF] border-r-2",
          className
        )}
        {...props}
        onClick={() => {
          navigate(to);
          if (isNavOpen) toggleNav();
        }}
      >
        {Icon && <Icon className="z-10" />}
        <h5 className="capitalize sm:hidden xl:block z-10">{label}</h5>
      </button>
    </li>
  );
};
