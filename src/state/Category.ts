import { atom } from 'recoil';

export const selectedCategoryState = atom<string>({
	key: 'selectedCategoryState',
	default: '',
});
export interface Item {
	name: string;
	price: string;
	img: string;
}
