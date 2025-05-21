import React from "react";
import { addZero, formatFullDate } from "../../../util/timeFormatter.js";

function TodosItemDeadLine({ deadline }) {
  const deadlineArray = formatFullDate(deadline);
  return (
    <div className={"flex gap-1 pl-4"}>
      {deadlineArray.map((item, i) =>
        i === 0 ? (
          <p className='min-w-5' key={i}>
            {addZero(item)}
          </p>
        ) : (
          <p className='flex-1 basis-0' key={i}>
            {item}
          </p>
        )
      )}
    </div>
  );
}

export default TodosItemDeadLine;
