export interface Item {
	options: string;
	id: number;
	name: string;
	price: number;
	imageName: string;
	imageUrl: string;
	category: string;
	soldOut: boolean;
}

export interface Category {
	id: string;
	category: string;
}
