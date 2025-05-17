import clsx from "clsx";

export const OptionsSection = ({ children, className, ...props }) => {
  return (
    <section
      className={clsx(
        "shadow-block p-[10px] lg:p-[20px] lg:flex-1/5 hidden lg:block",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};
