import clsx from "clsx";

export const SideNavTitle = ({ label, className, ...props }) => {
  return (
    <p
      className={clsx(
        "text-gray-400 capitalize mb-[10px] hidden xl:block",
        className
      )}
      {...props}
    >
      {label}
    </p>
  );
};
