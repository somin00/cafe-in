import { getStorage, ref as storageRef, getDownloadURL, uploadBytes } from 'firebase/storage';
import { addToDB, getCollection, getDataFromDB, updateData } from '../db';
import { MenuType } from '../../types/menuMangementType';

const menuItemRef = getCollection('menuItem');

export const storeImage = async (file: File, imageName: string) => {
	const storage = getStorage();
	const imageRef = storageRef(storage, `images/${imageName}`);
	const snapshot = await uploadBytes(imageRef, file);
	const url = await getDownloadURL(snapshot.ref);
	return url;
};

export const addMenu = async (menuInfo: MenuType, imageUrl: string) => {
	await addToDB(menuItemRef, {
		...menuInfo,
		imageUrl: imageUrl,
	});
};

export const updateMenu = async (menuInfo: MenuType, newImageUrl: string) => {
	const { id, name, price, category, imageName, imageUrl, soldout } = menuInfo;
	const menuData = await getDataFromDB(menuItemRef, 'id', id);
	if (menuData.docs.length !== 0) {
		await updateData(menuData.docs[0].ref, {
			id: id.toString(),
			name,
			price,
			category,
			imageName,
			imageUrl: newImageUrl ? newImageUrl : imageUrl,
			soldout,
		});
	}
};
