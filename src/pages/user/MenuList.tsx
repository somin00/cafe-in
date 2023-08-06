import React from 'react';
import MenuItem from '../../components/UserMode/MenuItem';
import SelectedItemContainer from '../../components/UserMode/SelectedItemContainer';
import { styled } from 'styled-components';
import MenuListHeader from '../../components/UserMode/MenuListHeader';
import { darkTheme, defaultTheme } from '../../style/theme';

function MenuList() {
	return (
		<Layout>
			<MenuListHeader />
			<Main>
				<MenuListLayout>
					<MenuItem />
				</MenuListLayout>
				<SelectedItemContainer />

			
				<SeletedItemContainer />

			</Main>
		</Layout>
	);
}

const Layout = styled.div`
	background-color: ${({ theme }) =>
		theme === defaultTheme ? defaultTheme.textColor.lightgray : darkTheme.textColor.black};
	width: 1194px;
	height: 834px;
	overflow-y: hidden;
`;
const Main = styled.div`
	position: relative;
	display: flex;
	justify-content: space-between;
`;

const MenuListLayout = styled.ul`
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

export default MenuList;
