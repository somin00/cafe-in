import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';
export const FireStoreDoc = async () => {
	const menuItemsRef = collection(db, 'menuItem');
	const menuItemsSnapshot = await getDocs(menuItemsRef);
	const menuItems = menuItemsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

	return menuItems;
};
