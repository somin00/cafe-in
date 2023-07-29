import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import OptionMenu from './OptionMenu';
import { useRecoilValue } from 'recoil';
import { selectedModeState } from '../../state/Mode';
import { Item } from '../../state/Category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

function MenuItem() {
	const mode = useRecoilValue(selectedModeState);
	const [isOpenModal, setModalOpen] = useState<boolean>(false);
	const [items, setItems] = useState<Item[]>([]);

	const onClickToggleModal = useCallback(() => {
		setModalOpen(!isOpenModal);
	}, [isOpenModal]);

	useEffect(() => {
		const fetchItems = async () => {
			try {
				const itemCollection = collection(db, 'menuItem');
				const querySnapshot = await getDocs(itemCollection);
				const loadedItems = querySnapshot.docs.map((doc) => doc.data() as Item);
				setItems(loadedItems);
			} catch (err) {
				console.error(err);
			}
		};
		fetchItems();
	}, []);
	return (
		<>
			{items.map((item, index) => (
				<MenuItemWrapper key={index} onClick={onClickToggleModal}>
					<button>
						<img src={item.img} alt={item.name} />
						<p className="menu-name">{item.name}</p>
						<p className="menu-price">{item.price}</p>
					</button>
				</MenuItemWrapper>
			))}
			{mode === 'user' || (isOpenModal && <OptionMenu onClickToggleModal={onClickToggleModal}></OptionMenu>)}
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
