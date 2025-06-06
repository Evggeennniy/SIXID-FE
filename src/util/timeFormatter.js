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
	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	return `${day}.${month}`;
}

export const formatDateToYYYYMMDD = (date) => {
	const year = date.getFullYear();
	const month = `${date.getMonth() + 1}`.padStart(2, "0");
	const day = `${date.getDate()}`.padStart(2, "0");
	return `${year}-${month}-${day}`;
};