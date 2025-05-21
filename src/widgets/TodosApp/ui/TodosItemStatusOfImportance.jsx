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
    <div className='pl-4 flex gap-2 items-center'>
      <div
        style={{
          background: сircleColor,
        }}
        className={`w-5 h-5 rounded-full`}
      ></div>
      <p className='capitalize'> {statusOfImportant}</p>
    </div>
  );
}

export default TodosItemStatusOfImportance;
