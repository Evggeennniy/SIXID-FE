import clsx from "clsx";
export const SideNavTitle = ({ label, className, ...props }) => {
  return (
    <p
      className={clsx(
        "text-gray-400 capitalize mb-[10px]",
        "text-xs xl:text-sm", // Smaller on mobile, slightly larger on xl
        "block sm:hidden xl:block", // Show on mobile (<640px) and xl (≥1280px), hidden in between
        className
      )}
      {...props}
    >
      {label}
    </p>
  );
};
