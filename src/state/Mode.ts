import { atom } from 'recoil';

export const selectedModeState = atom<string>({
	key: 'selectedModeState',
	default: '',
});
