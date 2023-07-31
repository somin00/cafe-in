import { atom } from 'recoil';

export const isWaitingState = atom<boolean>({
	key: 'isWaiting',
	default: true,
});

export const isWaitingAvailableState = atom<boolean>({
	key: 'isWaitingAvailable',
	default: true,
});
