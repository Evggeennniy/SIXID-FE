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
    <div className="flex gap-2 h-full items-center w-auto sm:w-[135px]">
      <div
        style={{ background: сircleColor }}
        className={`w-5 h-5 rounded-full`}
      ></div>
      <p className="capitalize hidden sm:flex">{text}</p>
    </div>
  );
}

export default TodosItemStatusOfImportance;
