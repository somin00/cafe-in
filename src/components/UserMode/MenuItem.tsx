import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import OptionMenu from './OptionMenu';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Item } from '../../state/Category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { selectedCategoryState } from '../../state/CategoryList';
import { selectedItemsState } from '../../firebase/FirStoreDoc';
import { Option, selectedItem } from '../../state/OptinalState';
function MenuItem() {
	const selectedCategory = useRecoilValue(selectedCategoryState);
	const [isOpenModal, setModalOpen] = useState<boolean>(false);
	const [items, setItems] = useState<Item[]>([]);
	const [selectedItems, setSelectedItems] = useRecoilState(selectedItemsState);
	const onClickToggleModal = useCallback(() => {
		setModalOpen(!isOpenModal);
	}, [isOpenModal]);

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

	const saveToSelectedItem = (selectedItem: Item, selectedItemOptions: Option[] = []) => {
		const selectedOptionsStr =
			selectedItemOptions.length > 0
				? selectedItemOptions
						.map((i) => i.name)
						.sort()
						.join(',')
				: '없음';

		const itemToBeAdded: selectedItem = {
			...selectedItem,
			date: new Date(),
			id: selectedItem.id,
			quantity: 1,
			options: selectedOptionsStr,
			totalPrice: selectedItem.price,
			progress: '선택주문',
		};
		setSelectedItems((prevItems: Item[]) => [...prevItems, itemToBeAdded as unknown as Item]);
	};

	const handleClick = async (item: Item) => {
		setSelectedItems((prevItems) => [...prevItems, item]);
		if (item.category === '스무디' || item.category === '디저트') {
			await saveToSelectedItem(item, []);
			onClickToggleModal();
		} else {
			onClickToggleModal();
		}
	};
	return (
		<>
			{items.map((item) => (
				<MenuItemWrapper key={item.id}>
					<button onClick={() => handleClick(item)}>
						<img src={item.imageUrl} alt={item.imageName} />
						<p className="menu-name">{item.name}</p>
						<p className="menu-price">{item.price}</p>
					</button>
				</MenuItemWrapper>
			))}
			{isOpenModal && <OptionMenu onClickToggleModal={onClickToggleModal} selected={selectedItems} />}
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
