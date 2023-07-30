export interface Option {
	category: string;
	name: string;
	price: number;
	options: string;
}

export interface seletedItem {
	price: number;
	category: string;
	id: string;
	name: string;
	options: string[];
	quantity: number;
	totalPrice: number;
}
export interface orderList {
	id: string;
	menu: string;
	options: string;
	progress: string;
	quantity: number;
	status: string;
	takeout: boolean;
	totalPrice: number;
}
