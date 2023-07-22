import React from 'react';
import styled from 'styled-components';
import Header from '../../components/MenuManagement/Header';
import CategoryList from '../../components/MenuManagement/CategoryList';
import MenuList from '../../components/MenuManagement/MenuList';

function MenuManagement() {
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
	height: 100vh;
	background-color: #f9f9f9;
`;
