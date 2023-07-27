import React from 'react';
import styled from 'styled-components';
import Header from '../../components/MenuManagement/Header';
import CategoryList from '../../components/MenuManagement/CategoryList';
import MenuList from '../../components/MenuManagement/MenuList';
import AddMenuModal from '../../components/MenuManagement/AddMenuModal';
import EditMenuModal from '../../components/MenuManagement/EditMenuModal';
import DeleteModal from '../../components/MenuManagement/DeleteModal';
import CategoryManagementModal from '../../components/MenuManagement/CategoryManagementModal';

function MenuManagement() {
	return (
		<MenuManagementWrapper>
			<Header />
			<CategoryList />
			<MenuList />
			{/* 임시 */}
			<AddMenuModal />
			<EditMenuModal />
			<DeleteModal />
			<CategoryManagementModal />
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
