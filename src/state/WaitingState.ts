import { atom } from 'recoil';

export const isWaitingState = atom<boolean>({
	key: 'isWaiting',
	default: true,
});
