import React, { useState } from 'react';
import styled from 'styled-components';
import ModalInput from './ModalInput';
import { ModalDefaultType } from '../../types/ModalOpenTypes';
import { MenuType } from '../../types/menuMangementType';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { getStorage, ref as storageRef, getDownloadURL, uploadBytes } from 'firebase/storage';
import { useRecoilValue } from 'recoil';
import { selectedCategoryState } from '../../state/CategoryList';

function AddMenuModal({ onClickToggleModal }: ModalDefaultType) {
	const selectedCategory = useRecoilValue(selectedCategoryState);

	const initialMenu: MenuType = {
		id: 0,
		name: '',
		price: '',
		category: selectedCategory,
		soldout: false,
		imageUrl: '',
		imageName: '',
	};

	const menuItemRef = collection(db, 'menuItem');
	const storage = getStorage();

	const [menuInfo, setMenuInfo] = useState<MenuType>(initialMenu);
	const [file, setFile] = useState<File>();

	const validate = (): boolean => {
		let isValid = true;
		if (
			menuInfo.name.trim().length === 0 ||
			menuInfo.price.trim().length === 0 ||
			menuInfo.category.trim().length === 0 ||
			!menuInfo.imageName
		) {
			isValid = false;
		}
		return isValid;
	};

	const storeImg = async () => {
		if (!file) return;
		const imageRef = storageRef(storage, `images/${menuInfo.imageName}`);
		const snapshot = await uploadBytes(imageRef, file);
		const url = await getDownloadURL(snapshot.ref);
		return url;
	};

	const handleAddMenu = async () => {
		const imageUrl = await storeImg();
		addDoc(menuItemRef, {
			...menuInfo,
			id: Date.now(),
			imageUrl: imageUrl,
		});
		setMenuInfo(initialMenu);
		onClickToggleModal();
	};

	const handleDeleteMenu = () => {
		setMenuInfo(initialMenu);
		onClickToggleModal();
	};

	return (
		<AddModalWrapper>
			<AddModalContent>
				<ModalInput menuInfo={menuInfo} setMenuState={setMenuInfo} setFile={setFile} />
				<Guide>*모든 정보 입력 후 메뉴 추가가 가능합니다.</Guide>
				<div>
					<Button type="button" onClick={handleAddMenu} disabled={!validate() ? true : false}>
						추가
					</Button>
					<Button type="button" onClick={handleDeleteMenu}>
						취소
					</Button>
				</div>
			</AddModalContent>
		</AddModalWrapper>
	);
}

export default AddMenuModal;

const AddModalWrapper = styled.div`
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
const AddModalContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 896px;
	height: 586px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor?.yellow.background : theme.textColor.black)};
	padding-top: 58px;
	border-radius: 10px;
`;

const Guide = styled.p`
	position: relative;
	top: -55px;
	right: 62px;
	width: 400px;
	text-align: right;
	align-self: flex-end;
`;

const Button = styled.button`
	width: 146px;
	height: 57px;
	border-radius: 10px;
	font-size: ${({ theme }) => theme.fontSize['3xl']};
	font-weight: ${({ theme }) => theme.fontWeight.regular};
	color: ${({ theme }) => theme.textColor.white};
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor?.yellow.sub : theme.darkColor?.main)};

	&:first-child {
		margin-right: 24px;
	}

	&:disabled {
		cursor: not-allowed;
	}
`;
