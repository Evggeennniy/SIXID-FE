import clsx from "clsx";

export const NavSection = ({ children, className, ...props }) => {
  return (
    <section
      className={clsx(
        "lg:flex-1/5 p-[10px] lg:p-[20px] transition-[left] absolute top-0 bottom-0 z-10 sm:static rounded-[20px] shadow-[0_0_10px_0_#dbdaf0]",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};
