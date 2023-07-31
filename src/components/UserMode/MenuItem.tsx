import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import OptionMenu from './OptionMenu';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedModeState } from '../../state/Mode';
import { Item } from '../../state/Category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { selectedCategoryState } from '../../state/CategoryList';
import { selectedItemsState } from '../../firebase/FirStoreDoc';

function MenuItem() {
	const mode = useRecoilValue(selectedModeState);
	const selectedCategory = useRecoilValue(selectedCategoryState);
	const [isOpenModal, setModalOpen] = useState<boolean>(false);
	const [items, setItems] = useState<Item[]>([]);
	const [selectedItem, setSelectedItem] = useRecoilState(selectedItemsState);
	const onClickToggleModal = useCallback(() => {
		setModalOpen(!isOpenModal);
	}, [isOpenModal]);
	const handleClick = (item: Item) => {
		console.log(`Item Name: ${item.name}, Item ID: ${item.id}`);
		setSelectedItem(item);
	};
	useEffect(() => {
		const fetchItems = async () => {
			try {
				const itemCollection = collection(db, 'menuItem');
				let itemsQuery;
				if (selectedCategory) {
					itemsQuery = query(itemCollection, where('category', '==', selectedCategory));
				} else {
					itemsQuery = itemCollection;
				}
				const querySnapshot = await getDocs(itemsQuery);
				const loadedItems = querySnapshot.docs.map((doc) => {
					const data = doc.data() as Item;
					return {
						...data,
						price: Number(data.price),
					} as Item;
				});
				setItems(loadedItems);
			} catch (err) {
				console.error(err);
			}
		};
		fetchItems();
	}, [selectedCategory]);
	return (
		<>
			{items.map((item) => (
				<MenuItemWrapper key={item.id} onClick={onClickToggleModal}>
					<button onClick={() => handleClick(item)}>
						<img src={item.imageUrl} alt={item.imageName} />
						<p className="menu-name">{item.name}</p>
						<p className="menu-price">{item.price}</p>
					</button>
				</MenuItemWrapper>
			))}
			{mode === 'user' ||
				(isOpenModal && <OptionMenu onClickToggleModal={onClickToggleModal} selected={selectedItem} />)}
		</>
	);
}

export default MenuItem;

const MenuItemWrapper = styled.li`
	background-color: ${({ theme }) => theme.textColor.white};
	border: 1px solid ${({ theme }) => theme.textColor.lightgray};
	border-radius: 15px;
	width: 250px;
	height: 300px;

	button {
		width: 100%;
		height: 100%;
		border-radius: 15px;
	}

	img {
		width: 218px;
		height: 204px;
	}

	.menu-name {
		margin: 17px 0 7px 0;
		font-size: ${({ theme }) => theme.fontSize['xl']};
		font-weight: ${({ theme }) => theme.fontWeight.bold};
	}

	p {
		font-size: ${({ theme }) => theme.fontSize.lg};
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
	}
`;
