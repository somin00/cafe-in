import { atom } from 'recoil';
import { Option } from '../state/OptinalState';
import { collection, getDocs } from 'firebase/firestore';

export const selectedOptionsState = atom<Option[]>({
	key: 'selectedOptionsState',
	default: [],
});
export const fetchSelectedItems = async (db: any) => {
	const selectedItemRef = collection(db, 'selectedItem');
	const selectedItemSnapshot = await getDocs(selectedItemRef);
	const selectedItems = selectedItemSnapshot.docs.map((doc: { data: () => any; id: any }) => ({
		...doc.data(),
		id: doc.id,
	}));

	return selectedItems;
};
