import { atom } from 'recoil';

export interface Option {
	category: string;
	name: string;
	price: number;
}

export const selectedOptionsState = atom<Option[]>({
	key: 'selectedOptionsState',
	default: [],
});
