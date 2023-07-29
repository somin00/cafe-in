import { collection, getDocs } from 'firebase/firestore';
import { atom, selector } from 'recoil';
import { db } from './firebaseConfig';
import { Option } from '../state/OptinalState';

export const FireStoreDoc = async () => {
	const menuItemsRef = collection(db, 'menuItem');
	const menuItemsSnapshot = await getDocs(menuItemsRef);
	const menuItems = menuItemsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

	return menuItems;
};
export const optionsState = selector({
	key: 'optionsState',
	get: async () => {
		const optionsRef = collection(db, 'options');
		const optionsSnapshot = await getDocs(optionsRef);
		if (!optionsSnapshot.docs.length) {
			throw new Error('옵션에 데이터 없쪄 ');
		}
		const firstDoc = optionsSnapshot.docs[0];
		const optionsData = firstDoc.data() as Record<string, Option[]>;

		return optionsData;
	},
});
export const selectedOptionsState = atom<Option[]>({
	key: 'selectedOptionsState',
	default: [],
});
