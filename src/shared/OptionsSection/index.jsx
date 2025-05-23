import clsx from "clsx";

export const OptionsSection = ({ children, className, ...props }) => {
  return (
    <section
      className={clsx(
        "lg:flex-1/5 p-[10px] lg:p-[20px] hidden lg:block rounded-[20px] shadow-[0_0_10px_0_#dbdaf0]",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};
