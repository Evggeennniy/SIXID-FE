import clsx from "clsx";

export const MainSection = ({ children, className, ...props }) => {
  return (
    <section
      className={clsx("flex-3/5 p-[5px] sm:p-[10px] lg:p-[20px]", className)}
      {...props}
    >
      {children}
    </section>
  );
};
