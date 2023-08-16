import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import OptionMenu from './OptionMenu';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Item } from '../../types/Category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { selectedCategoryState } from '../../state/CategoryList';
import { selectedItemsState } from '../../firebase/FirStoreDoc';
import { Option, selectedItem } from '../../types/OptinalState';
function MenuItem() {
	const selectedCategory = useRecoilValue(selectedCategoryState);
	const [isOpenModal, setModalOpen] = useState<boolean>(false);
	const [items, setItems] = useState<Item[]>([]);
	const [selectedItems, setSelectedItems] = useRecoilState(selectedItemsState);

	const [clickedMenuItem, setClickedMenuItem] = useState<Item | null>(null); // 추가: 클릭한 메뉴 아이템 저장용 상태

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

	const addSelectedItem = (item: Item, options: Option[] = []) => {
		const optionsStr =
			options.length > 0
				? options
						.map((i) => i.name)
						.sort()
						.join(',')
				: '없음';

		const newItem = {
			...item,
			date: new Date(),
			quantity: 1,
			options: optionsStr,
			totalPrice: item.price,
			progress: '선택주문',
		};
		setSelectedItems((prev) => {
			const existingItemIndex = prev.findIndex(
				(existingItem) => existingItem.name === newItem.name && existingItem.options === newItem.options,
			);

			if (existingItemIndex >= 0) {
				const updatedItem = {
					...prev[existingItemIndex],
					quantity: prev[existingItemIndex].quantity + 1,
				};
				const updatedItems = [...prev.slice(0, existingItemIndex), updatedItem, ...prev.slice(existingItemIndex + 1)];
				return updatedItems;
			} else {
				return [...prev, newItem];
			}
		});
	};
	const handleClickMenuItem = (item: Item) => {
		if (['스무디', '디저트'].includes(item.category)) {
			addSelectedItem(item);
		} else {
			setClickedMenuItem(item);
			onClickToggleModal();
		}
	};

	return (
		<>
			{items.map((item) => (
				<MenuItemWrapper key={item.id}>
					<button onClick={() => handleClickMenuItem(item)}>
						<img src={item.imageUrl} alt={item.imageName} />
						<p className="menu-name">{item.name}</p>
						<p className="menu-price">{item.price}</p>
					</button>
				</MenuItemWrapper>
			))}
			{isOpenModal && <OptionMenu onClickToggleModal={onClickToggleModal} clickedItem={clickedMenuItem} />}
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
