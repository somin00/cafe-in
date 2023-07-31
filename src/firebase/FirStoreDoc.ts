import { atom } from 'recoil';
import { Option, selectedItem } from '../state/OptinalState';

export const selectedOptionsState = atom<Option[]>({
	key: 'selectedOptionsState',
	default: [],
});

//사용자가 선택한 메뉴 아이템
export const selectedItemsState = atom<selectedItem[]>({
	key: 'selectedItemsState',
	default: [],
});

export const menuItemState = atom({
	key: 'menuItemState',
	default: {
		id: 0,
		name: '',
		price: '',
		imageName: '',
		imageUrl: '',
		category: '',
		soldOut: false,
	},
});
