import React from "react";

function TodosItemStatusOfImportance({ priority }) {
  let text;
  let сircleColor;
  if (priority === "important") {
    сircleColor = "rgba(50, 195, 104, 1)";

    text = "Важно";
  } else if (priority === "urgent") {
    сircleColor = "rgba(255, 0, 0, 1)";
    text = "Срочно";
  } else {
    сircleColor = "rgba(150, 227, 255, 1)";
    text = "Обычно";
  }
  return (
    <div className='xl:pl-3 shrink-0 flex gap-2  items-center  sm:w-full'>
      <div
        style={{ background: сircleColor }}
        className={`w-5 flex-shrink-0 h-5 rounded-full`}
      ></div>
      <p className='capitalize hidden sm:block'> {text}</p>
    </div>
  );
}

export default TodosItemStatusOfImportance;
