export interface Option {
	id: number;
	category: string;
	name: string;
	price: number;
	options: string;
}

export interface selectedItem {
	price: string;
	category: string;
	id: string;
	name: string;
	options: string;
	quantity: number;
	totalPrice: number;
}
export interface orderList {
	id: number;
	menu: string;
	options: string;
	progress: string;
	quantity: number;
	status: string;
	takeout: boolean;
	totalPrice: number;
}
