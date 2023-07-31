export interface Option {
	id: number;
	category: string;
	name: string;
	price: number;
	options: string;
}

export interface selectedItem {
<<<<<<< HEAD
	price: string;
=======
	price: number;
>>>>>>> c08ba48d68d30c994c0b606f18f127e324718c4f
	category: string;
	id: string;
	name: string;
	options: string[];
	quantity: number;
	totalPrice: number;
}
export interface orderList {
<<<<<<< HEAD
	id: number;
=======
	id: string;
>>>>>>> c08ba48d68d30c994c0b606f18f127e324718c4f
	menu: string;
	options: string;
	progress: string;
	quantity: number;
	status: string;
	takeout: boolean;
	totalPrice: number;
}
