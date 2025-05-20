import clsx from "clsx";

import { useNavigate } from "react-router-dom";
import { useUIStore } from "@shared/store/ui-store";

export const SideNavItem = ({ Icon, label, to, className, ...props }) => {
  const navigate = useNavigate();
  const isNavOpen = useUIStore((state) => state.isNavOpen);
  const toggleNav = useUIStore((state) => state.toggleNav);

  return (
    <li>
      <button
        className={clsx(
          "flex items-center p-[5px] gap-[10px] transition duration-100 ease-in-out active:scale-[95%]",
          className
        )}
        {...props}
        onClick={() => {
          navigate(to);
          isNavOpen && toggleNav();
        }}
      >
        {Icon && <Icon />}
        <h5 className="capitalize sm:hidden lg:block">{label}</h5>
      </button>
    </li>
  );
};
