import CalendarDayCell  from "./CalendarDayCell";

export default function CalendarGrid({ days, today, deadlineMap }) {
	return (
		<div className='grid grid-cols-7 gap-2 text-center sm:gap-2 gap-[1px] text-xs sm:text-sm'>
			{days.map((day, index) => {
				const dateStr = day.date.toDateString();
				const isToday = dateStr === today.toDateString();
				const importance = deadlineMap[dateStr];

				return (
					<CalendarDayCell
						key={index}
						day={day}
						isToday={isToday}
						importance={importance}
					/>
				);
			})}
		</div>
	);
}
