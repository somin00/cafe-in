import { atom } from 'recoil';

export interface Item {
	id: number;
	name: string;
	price: number;
	imageName: string;
	imageUrl: string;
	category: string;
	soldOut: boolean;
}

export const selectedCategoryState = atom<string>({
	key: 'selectedCategoryState',
	default: '',
});

export interface Category {
	id: string;
	category: string;
}
