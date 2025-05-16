import clsx from "clsx";

export const AppNavTitle = ({ label, className, ...props }) => {
  return (
    <p
      className={clsx(
        "text-gray-400 capitalize mb-[10px] hidden lg:block",
        className
      )}
      {...props}
    >
      {label}
    </p>
  );
};
