export default function WeekDaysHeader() {
	return (
		<div className='grid grid-cols-7 text-center text-sm font-medium text-[#4A4A4A] mb-2'>
			{["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"].map((d, i) => (
				<div key={i}>{d}</div>
			))}
		</div>
	);
}