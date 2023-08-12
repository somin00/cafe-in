import { atom } from 'recoil';

export const usedPointsState = atom<number | null>({
	key: 'enteredPointsState',
	default: null,
});
