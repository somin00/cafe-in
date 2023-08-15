import { atom } from 'recoil';
import { Option } from '../state/OptinalState';
import { Item } from '../state/Category';

export const selectedOptionsState = atom<Option[]>({
	key: 'selectedOptionsState',
	default: [],
});

//사용자가 선택한 메뉴 아이템
export const selectedItemsState = atom({
	key: 'selectedItemsState',
	default: [] as Item[],
});

export const menuItemState = atom<Item[]>({
	key: 'menuItemState',
	default: [],
});
