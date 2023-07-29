import React from 'react';
import styled from 'styled-components';
import MenuItem from '../MenuItem';

function MenuList() {
	return (
		<MenuListWrapper>
			<MenuItem />
		</MenuListWrapper>
	);
}

export default MenuList;

const MenuListWrapper = styled.ul`
	padding: 40px 28px 45px 28px;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-column-gap: 46px;
	grid-row-gap: 22px;
`;
