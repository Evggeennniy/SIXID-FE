import { addZero, formatFullDate } from "../../../util/timeFormatter";

export const TodosItem = ({
  title,
  deadline,
  statusOfImportant,
  isActive,
  onClick,
  isComplete,
}) => {
  let сircleColor;

  const deadlineArray = formatFullDate(deadline);

  if (statusOfImportant === "важно") {
    сircleColor = "rgba(50, 195, 104, 1)";
  } else if (statusOfImportant === "срочно") {
    сircleColor = "rgba(255, 0, 0, 1)";
  } else {
    сircleColor = "rgba(150, 227, 255, 1)";
  }

  return (
    <>
      {!isComplete && (
        <li
          className={`grid grid-cols-6 w-full items-start text-[#5E5E5E] gap-[.9375rem] p-[.8125rem]
          ${isActive ? "bg-white" : "bg-transparent"}
          hover:bg-white cursor-pointer transition-colors duration-200`}
          onClick={onClick}
        >
          <div className='col-span-4 flex gap-4'>
            <input type='checkbox' name='is_done' />
            <h5 className='leading-normal'>{title}</h5>
          </div>
          <div className='xl:pl-4  flex gap-2 flex-shrink-0 items-center'>
            <div
              style={{ background: сircleColor }}
              className={`w-5 h-5 rounded-full`}
            ></div>
            <p className='capitalize'> {statusOfImportant}</p>
          </div>

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
        </li>
      )}
      {isComplete && (
        <li
          className={`grid grid-cols-6 w-full items-start text-[#A4A4A4]  gap-[.9375rem] p-[.8125rem]
          ${isActive ? "bg-white" : "bg-transparent"}
          hover:bg-white cursor-pointer transition-colors duration-200`}
          onClick={onClick}
        >
          <div className='col-span-4 flex gap-4'>
            <input
              type='checkbox'
              checked={true}
              name='is_done'
              className='accent-[#A8A5FF]'
            />
            <h5 className='leading-normal '>{title}</h5>
          </div>
          <div className='xl:pl-4  flex gap-2 flex-shrink-0 items-center'>
            <div
              style={{ background: сircleColor }}
              className={`w-5 h-5 rounded-full`}
            ></div>
            <p className='capitalize'> {statusOfImportant}</p>
          </div>

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
        </li>
      )}
    </>
  );
};
