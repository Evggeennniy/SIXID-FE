import clsx from "clsx";

export const NavSection = ({ children, className, ...props }) => {
  return (
    <section
      className={clsx(
        "xl:basis-[20%] xl:max-w-[20%] xl:basis-[15%] xl:max-w-[15%] xl:flex-none p-[.625rem] lg:p-[1.25rem] transition-[left] absolute top-0 bottom-0 z-10 sm:static rounded-[1.25rem] shadow-[0_0_.625rem_0_#dbdaf0]",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};
