import React from 'react';
import styled from 'styled-components';
import MenuItem from '../MenuItem';

function MenuList() {
	return (
		<Layout>
			<MenuListWrapper>
				<MenuItem />
			</MenuListWrapper>
		</Layout>
	);
}

export default MenuList;

const Layout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 8px;
	height: 830px;
	margin: 30px 0;
	overflow-y: auto;
	overflow-x: hidden;
	margin-right: 10px;
	padding-left: 10px;
	&::-webkit-scrollbar {
		display: none;
	}
	/* Firefox */
	scrollbar-width: none;
`;
const MenuListWrapper = styled.ul`
	padding: 40px 28px 45px 28px;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-column-gap: 46px;
	grid-row-gap: 22px;
`;
