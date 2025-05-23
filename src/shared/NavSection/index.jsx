import clsx from "clsx";

export const NavSection = ({ children, className, ...props }) => {
  return (
    <section
      className={clsx(
        "lg:basis-[16%] lg:max-w-[16%] lg:flex-none p-[.625rem] lg:p-[1.25rem] transition-[left] absolute top-0 bottom-0 z-10 sm:static rounded-[1.25rem] shadow-[0_0_.625rem_0_#dbdaf0]",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};
