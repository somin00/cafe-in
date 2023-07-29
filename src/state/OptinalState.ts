export interface Category {
	id: string;
	options: Option[];
}

export interface Option {
	category: string;
	name: string;
	price: number;
}
