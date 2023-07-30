import { atom } from 'recoil';

export interface Item {
	name: string;
	price: string;
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

export const selectedItemsState = atom({
	key: 'selectedItemsState',
	default: [],
});
