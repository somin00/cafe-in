import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/MenuManagement/Header';
import CategoryList from '../../components/MenuManagement/CategoryList';
import MenuList from '../../components/MenuManagement/MenuList';
import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { categoryListState } from '../../state/CategoryList';
import { CategoryType } from '../../types/categoryTypes';
function MenuManagement() {
	const categoryList = useRecoilState(categoryListState);
	const categoryListRef = collection(db, 'categoryList');
	const setCategoryList = useSetRecoilState(categoryListState);

	useEffect(() => {
		getDocs(query(categoryListRef, orderBy('id'))).then((res) => {
			const list: CategoryType[] = [];
			res.forEach(async (data) => {
				list.push({
					id: data.data().id,
					category: data.data().category,
				});
			});
			setCategoryList(list);
		});
	}, [categoryList, categoryListRef, setCategoryList]);

	return (
		<MenuManagementWrapper>
			<Header />
			<CategoryList />
			<MenuList />
		</MenuManagementWrapper>
	);
}

export default MenuManagement;

const MenuManagementWrapper = styled.div`
	width: 1194px;
	height: 100vh;
	background-color: #f9f9f9;
	background-color: ${({ theme }) => (theme.lightColor ? '#f9f9f9' : '#222222')};
`;
