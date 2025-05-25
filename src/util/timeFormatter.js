export function formatFullDate(dateStr) {
	const date = new Date(dateStr);

	const options = {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	};


	const formatted = date.toLocaleDateString('ru-RU', options).replace(/\s?г\.?$/, '');


	return formatted.split(' ');
}
export function addZero(num) {
	return num < 10 ? '0' + num : num.toString();
}