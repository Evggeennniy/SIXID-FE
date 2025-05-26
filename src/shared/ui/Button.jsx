import clsx from "clsx";

function Button({ text, classname, ...props }) {
  return (
    <button
      className={clsx(
        "rounded-xl shadow text-[#5E5E5E] py-3 px-5 bg-[#EFF7FF] flex justify-center items-center transition-shadow duration-200 hover:shadow-lg",
        classname
      )}
      {...props}
    >
      {text}
    </button>
  );
}

export default Button;
