import { collection, getDocs } from 'firebase/firestore';
import { selector } from 'recoil';
import { Option } from '../state/OptinalState';
import { db } from './firebaseConfig';
export const MenuItem = async () => {
	const menuItemsRef = collection(db, 'menuItem');
	const menuItemsSnapshot = await getDocs(menuItemsRef);
	const menuItems = menuItemsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

	return menuItems;
};

//options 컬렉션 가져오고 배열로뿌려줌
export const optionsState = selector({
	key: 'optionsState',
	get: async () => {
		const optionsRef = collection(db, 'options');
		const optionsSnapshot = await getDocs(optionsRef);
		const optionsData = optionsSnapshot.docs.reduce(
			(acc, doc) => {
				acc[doc.id] = doc.data().choices;
				return acc;
			},
			{} as Record<string, Option[]>,
		);

		return optionsData;
	},
});
