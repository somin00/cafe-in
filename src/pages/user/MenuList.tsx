import React from 'react';
import MenuItem from '../../components/UserMode/MenuItem';
import SeletedItemContainer from '../../components/UserMode/SeletedItemContainer';
import { styled } from 'styled-components';
import MenuListHeader from '../../components/UserMode/MenuListHeader';
import { darkTheme, defaultTheme } from '../../style/theme';

function MenuList() {
	return (
		<Layout>
			<MenuListHeader />
			<Main>
				<MenuItem />
				<SeletedItemContainer />
			</Main>
		</Layout>
	);
}

const Layout = styled.div`
	background-color: ${({ theme }) =>
		theme === defaultTheme ? defaultTheme.textColor.lightgray : darkTheme.textColor.black};
	width: 1194px;
	overflow-y: hidden;
`;
const Main = styled.div`
	position: relative;
	display: flex;
	justify-content: space-between;
`;

export default MenuList;
