import clsx from "clsx";

export const AppNavList = ({ children, className, ...props }) => {
  return (
    <ul
      className={clsx(
        "flex flex-col content-between gap-[15px] mb-[15px]",
        className
      )}
      {...props}
    >
      {children}
    </ul>
  );
};
