import { atom } from 'recoil';

export interface Item {
	id: number;
	name: string;
	price: number;
	img: string;
	category: string;
}

export const selectedCategoryState = atom<string>({
	key: 'selectedCategoryState',
	default: '',
});

export interface Category {
	id: string;
	category: string;
}

export interface MenuItem {
	id: number;
	name: string;
	price: number;
	img: string;
	category: string;
}
