import clsx from "clsx";

export const MainSection = ({ children, className, ...props }) => {
  return (
    <section
      className={clsx(
        "flex-3/5 p-[0_5px_5px] sm:p-[0_10px_5px] lg:p-[0px_20px_5px]",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};
