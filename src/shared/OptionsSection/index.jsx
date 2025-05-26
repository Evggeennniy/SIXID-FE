import clsx from "clsx";

export const OptionsSection = ({ children, className, open, ...props }) => {
  return (
    <section
      className={clsx(
        "rounded-[20px] shadow-[0_0_10px_0_#dbdaf0] transition-all duration-300 ease-in-out overflow-hidden",
        open ? "p-[10px] lg:p-[20px]" : "p-0",
        "lg:flex-[1_1_20%]",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};
