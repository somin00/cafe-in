import React, { useState } from 'react';
import styled from 'styled-components';
import ModalInput from './ModalInput';
import { MenuType } from '../../types/menuMangementType';
import { db } from '../../firebase/firebaseConfig';
import { getDocs, query, where, updateDoc, collection } from 'firebase/firestore';
import { getStorage, ref as storageRef, getDownloadURL, uploadBytes } from 'firebase/storage';

interface EditModalPropType {
	menu: MenuType;
	onCloseModal: () => void;
}
function EditMenuModal({ menu, onCloseModal }: EditModalPropType) {
	const [menuInfo, setMenuInfo] = useState<MenuType>(menu);
	const [file, setFile] = useState<File>();

	const menuItemRef = collection(db, 'menuItem');
	const storage = getStorage();

	const storeImg = async () => {
		if (!file) return;
		const imageRef = storageRef(storage, `images/${menuInfo.imageName}`);
		const snapshot = await uploadBytes(imageRef, file);
		const url = await getDownloadURL(snapshot.ref);
		return url;
	};

	const handleEditMenu = async () => {
		const imageUrl = await storeImg();
		const menuData = await getDocs(query(menuItemRef, where('id', '==', menuInfo.id)));
		if (menuData.docs.length !== 0) {
			await updateDoc(menuData.docs[0].ref, {
				id: menuInfo.id,
				name: menuInfo.name,
				price: menuInfo.price,
				category: menuInfo.category,
				imageName: menuInfo.imageName,
				imageUrl: imageUrl ? imageUrl : menuInfo.imageUrl,
				soldout: menuInfo.soldout,
			});
		}
		onCloseModal();
	};

	const handleDeleteEdit = () => {
		setMenuInfo(menu);
		onCloseModal();
	};

	return (
		<EditModalWrapper>
			<EditModalContent>
				<ModalInput menuInfo={menu} setMenuState={setMenuInfo} setFile={setFile} />
				<div>
					<Button type="button" onClick={handleEditMenu}>
						수정
					</Button>
					<Button type="button">삭제</Button>
					<Button type="button" onClick={handleDeleteEdit}>
						취소
					</Button>
				</div>
			</EditModalContent>
		</EditModalWrapper>
	);
}

export default EditMenuModal;

const EditModalWrapper = styled.div`
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.2);
	position: fixed;
	left: 0;
	top: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const EditModalContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 896px;
	height: 586px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor?.yellow.background : theme.textColor.black)};
	padding-top: 58px;
	border-radius: 10px;
`;

const Button = styled.button`
	width: 146px;
	height: 57px;
	border-radius: 10px;
	font-size: ${({ theme }) => theme.fontSize['3xl']};
	font-weight: ${({ theme }) => theme.fontWeight.regular};
	color: ${({ theme }) => theme.textColor.white};
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor?.yellow.sub : theme.darkColor?.main)};

	&:not(:last-child) {
		margin-right: 24px;
	}
`;
