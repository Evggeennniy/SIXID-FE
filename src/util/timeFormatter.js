export function formatFullDate(dateStr) {
	const date = new Date(dateStr);

	const day = addZero(date.getDate());
	const month = addZero(date.getMonth() + 1); // Months are 0-based
	const year = date.getFullYear();

	return `${day}.${month}.${year}`;
}

export function addZero(num) {
	return num < 10 ? '0' + num : num.toString();
}
export function formatShortDate(dateStr) {
	const date = new Date(dateStr);
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear();
	return `${month}.${year}`;
}
