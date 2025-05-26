import React from "react";

function TodosItemStatusOfImportance({ statusOfImportant }) {
  let сircleColor;
  if (statusOfImportant === "важно") {
    сircleColor = "rgba(50, 195, 104, 1)";
  } else if (statusOfImportant === "срочно") {
    сircleColor = "rgba(255, 0, 0, 1)";
  } else {
    сircleColor = "rgba(150, 227, 255, 1)";
  }
  return (
    <div className='xl:pl-3 shrink-0 flex gap-2  items-center w-full'>
      <div
        style={{ background: сircleColor }}
        className={`w-5 flex-shrink-0 h-5 rounded-full`}
      ></div>
      <p className='capitalize'> {statusOfImportant}</p>
    </div>
  );
}

export default TodosItemStatusOfImportance;
