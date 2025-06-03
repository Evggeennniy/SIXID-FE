export default function CalendarDayCell({ day, isToday, importance }) {
	const bgColor =
		importance === "срочно"
			? "bg-red-300"
			: importance === "важно"
				? "bg-green-300"
				: importance === "обычно"
					? "bg-[#96E3FF]"
					: "bg-white";

	const inactiveStyle = !day.currentMonth
		? "text-[#4A4A4A] bg-[#FFFFFF] opacity-40"
		: "";

	const todayStyle = isToday ? "border-2 border-blue-400 font-bold" : "";

	return (
		<div
			className={`p-2 rounded-lg flex items-start justify-start text-sm h-[130px] ${
				!day.currentMonth ? "text-[#4A4A4A] bg-[#FFFFFF] opacity-40" : ""
			} ${isToday ? "border-2 border-blue-400 font-bold" : ""} ${bgColor}`}
		>
			<span>{day.dayNumber}</span>
		</div>
	);
}