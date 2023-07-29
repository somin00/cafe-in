import { collection, getDocs } from 'firebase/firestore';
import { atom } from 'recoil';
import { db } from './firebaseConfig';
import { Option } from '../state/OptinalState';

export const FireStoreDoc = async () => {
	const menuItemsRef = collection(db, 'menuItem');
	const menuItemsSnapshot = await getDocs(menuItemsRef);
	const menuItems = menuItemsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

	return menuItems;
};

export const selectedOptionsState = atom<Option[]>({
	key: 'selectedOptionsState',
	default: [],
});
