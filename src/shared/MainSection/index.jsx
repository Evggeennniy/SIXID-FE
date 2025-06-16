import clsx from "clsx";

import { MainHeader } from "@widgets/MainHeader";

export const MainSection = ({ children, className, ...props }) => {
  return (
    <section
      className={clsx("flex-3/5 relative h-screen ", className)}
      {...props}
    >
      <MainHeader />
      {children}
    </section>
  );
};
