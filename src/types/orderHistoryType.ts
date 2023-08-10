export interface OrderListType {
	id: number;
	list: OrderListItemType[];
	progress: string;
	takeout: boolean;
}

export interface OrderListItemType {
	menu: string;
	isComplete: boolean;
	quantity: number;
	totalPrice: number;
}

export interface TodayDateType {
	year: number;
	month: number;
	date: number;
}