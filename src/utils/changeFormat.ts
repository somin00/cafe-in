export const changeDateFormat = (numberDate: number) => {
	const newDate = new Date(numberDate);
	const year = newDate.getFullYear();
	const month = newDate.getMonth();
	const date = newDate.getDate();
	const hour = newDate.getHours();
	const minute = newDate.getMinutes();
	const sec = newDate.getSeconds();

	return { year, month, date, hour, minute, sec };
};

export const changePriceFormat = (price: string) => {
	return price.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
