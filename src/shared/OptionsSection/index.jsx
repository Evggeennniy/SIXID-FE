import clsx from "clsx";

export const OptionsSection = ({ children, className, ...props }) => {
  return (
    <section
      className={clsx(
        "lg:flex-1/5 rounded-[20px] p-[10px] lg:p-[20px] shadow-[0_0_10px_0_#dbdaf0] transition-all duration-300 ease-in-out overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};
