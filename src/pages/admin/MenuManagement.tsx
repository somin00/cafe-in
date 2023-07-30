import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/MenuManagement/Header';
import CategoryList from '../../components/MenuManagement/CategoryList';
import MenuList from '../../components/MenuManagement/MenuList';
import { db } from '../../firebase/firebaseConfig';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useSetRecoilState } from 'recoil';
import { categoryListState } from '../../state/CategoryList';
import { CategoryType, MenuType } from '../../types/menuMangementType';
function MenuManagement() {
	const setCategoryList = useSetRecoilState(categoryListState);
	const [menuList, setMenuList] = useState<MenuType[] | null>([]);

	useEffect(() => {
		const fetchCategory = async () => {
			const categoryRef = collection(db, 'categoryList');
			const unsub = onSnapshot(query(categoryRef, orderBy('id')), (snapshot) => {
				const list: CategoryType[] = [];
				snapshot.docs.map((doc) => {
					const { id, category } = doc.data();
					list.push({
						id,
						category,
					});
				});
				setCategoryList(list);
			});
			return unsub;
		};
		fetchCategory();
	}, [onSnapshot]);

	useEffect(() => {
		const fetchMenu = async () => {
			const menuRef = collection(db, 'menuItem');
			const unsub = onSnapshot(query(menuRef, orderBy('id')), (snapshot) => {
				const list: MenuType[] = [];
				snapshot.docs.map((doc) => {
					const { id, name, price, category, soldout, imageUrl, imageName } = doc.data();
					list.push({
						id,
						name,
						price,
						category,
						soldout,
						imageUrl,
						imageName,
					});
				});
				setMenuList(list);
			});
			return unsub;
		};
		fetchMenu();
	}, [onSnapshot]);

	return (
		<MenuManagementWrapper>
			<Header />
			<CategoryList />
			<MenuList list={menuList} />
		</MenuManagementWrapper>
	);
}

export default MenuManagement;

const MenuManagementWrapper = styled.div`
	width: 1194px;
	height: 100vh;
	background-color: ${({ theme }) => (theme.lightColor ? '#f9f9f9' : theme.darkColor?.background)};
`;
