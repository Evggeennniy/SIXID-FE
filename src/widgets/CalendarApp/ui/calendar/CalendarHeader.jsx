import LeftIcon from "@assets/svg/left-arrow.svg?react";
import RightArrowIcon from "@assets/svg/right-arrow.svg?react";

export default function CalendarHeader({ month, year, onPrev, onNext, viewMode, setViewMode }) {
	const monthNames = [
		"Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
		"Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
	];

	return (
		<div className='w-full mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0'>
			<h2 className='text-lg sm:text-xl font-semibold text-center sm:text-left'>Календарь</h2>

			<div className='flex justify-center items-center gap-2'>
				<button className='p-2 px-4' onClick={onPrev}><LeftIcon/></button>
				<span className='font-medium text-[#5E5E5E]'>{monthNames[month]} {year}</span>
				<button className='p-2 px-4' onClick={onNext}><RightArrowIcon/></button>
			</div>

			<div className='flex justify-center sm:justify-end gap-2'>
				<button
					onClick={() => setViewMode("week")}
					className={`text-sm sm:text-base ${viewMode === "week" ? "font-bold underline" : ""}`}
				>
					Неделя
				</button>
				<button
					onClick={() => setViewMode("month")}
					className={`text-sm sm:text-base ${viewMode === "month" ? "font-bold underline" : ""}`}
				>
					Месяц
				</button>
			</div>
		</div>
	);
}
