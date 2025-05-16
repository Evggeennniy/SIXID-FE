import clsx from "clsx";
import { useNavigate } from "react-router-dom";

export const AppNavItem = ({ Icon, label, to, className, ...props }) => {
  const navigate = useNavigate();

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
        }}
      >
        {Icon && <Icon />}
        <h5 className="capitalize hidden lg:block">{label}</h5>
      </button>
    </li>
  );
};
