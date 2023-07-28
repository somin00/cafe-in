import { atom } from 'recoil';

export interface Option {
	category: string;
	name: string;
	price: number;
}

export const selectedOptionsState = atom<Record<string, Option[]>>({
	key: 'selectedOptionsState',
	default: {},
});
