import clsx from "clsx";

import { MainHeader } from "@widgets/MainHeader";

export const MainSection = ({ children, className, title, ...props }) => {
  return (
    <section
      className={clsx(
        "flex-3/5 p-[0_5px_5px] sm:p-[0_10px_5px]  relative lg:p-[0px_0px_5px_20px] pb-[100px] sm:pb-[20px]",
        className
      )}
      {...props}
    >
      <div className='pt-[70px]'></div>
      <MainHeader title={title || ""} />
      {children}
    </section>
  );
};
