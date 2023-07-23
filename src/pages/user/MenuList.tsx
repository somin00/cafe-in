import React from 'react';
import MenuItem from '../../components/MenuItem';
import SeletedItemContainer from '../../components/SeletedItemContainer';
import { styled } from 'styled-components';
function MenuList() {
	return (
		<Layout>
			<div>
				<h1>메뉴 주문</h1>
			</div>
			<Main>
				<MenuItem />
				<SeletedItemContainer />
			</Main>
		</Layout>
	);
}

const Layout = styled.div`
	background-color: aliceblue;
	width: 1194px;
`;
const Main = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 15px;
`;
export default MenuList;
