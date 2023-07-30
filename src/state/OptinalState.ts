export interface Option {
	category: string;
	name: string;
	price: number;
}

export interface seletedItem {
	id: string;
	menu: string;
	options: string;
	progress: string;
	quantity: number;
	status: string;
	takeout: boolean;
	totalPrice: number;
}
