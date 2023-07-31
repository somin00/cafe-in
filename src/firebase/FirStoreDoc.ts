import { atom } from 'recoil';
<<<<<<< HEAD
import { Option } from '../state/OptinalState';
import { Item } from '../state/Category';
=======
import { Option, selectedItem } from '../state/OptinalState';
>>>>>>> c08ba48d68d30c994c0b606f18f127e324718c4f

export const selectedOptionsState = atom<Option[]>({
	key: 'selectedOptionsState',
	default: [],
});

//사용자가 선택한 메뉴 아이템
<<<<<<< HEAD
export const selectedItemsState = atom({
	key: 'selectedItemsState',
	default: {} as Item,
});

export const menuItemState = atom<Item[]>({
	key: 'menuItemState',
	default: [],
});
=======
export const selectedItemsState = atom<selectedItem[]>({
	key: 'selectedItemsState',
	default: [],
});

//현재 메뉴 아이템
export const menuItemState = atom({
	key: 'menuItemState',
	default: {
		id: 0,
		name: '',
		price: 0,
		category: '',
	},
});
>>>>>>> c08ba48d68d30c994c0b606f18f127e324718c4f
