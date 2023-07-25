import React, { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import OptionMenu from './OptionMenu';
import { darkTheme, defaultTheme } from '../style/theme';

function MenuItem() {
	const [isOpenModal, setModalOpen] = useState<boolean>(false);

	const onClickToggleModal = useCallback(() => {
		setModalOpen(!isOpenModal);
	}, [isOpenModal]);

	return (
		<Layout>
			<ItemContainer onClick={onClickToggleModal}>
				{isOpenModal && <OptionMenu onClickToggleModal={onClickToggleModal}></OptionMenu>}
				<img src="/assets/user/IceCoffee.svg" alt="Ice Coffee" />
				<p className="menu-name"> 아메리카노 [Iced]</p>
				<p className="menu-price">4,500원</p>
			</ItemContainer>
		</Layout>
	);
}
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

const ItemContainer = styled.div`
	background-color: ${({ theme }) =>
		theme === defaultTheme ? defaultTheme.textColor.white : darkTheme.textColor.lightgray};
	border: 1px solid ${({ theme }) => theme.textColor?.lightbrown};
	border-radius: 15px;
	padding: 13px 16px;
	text-align: center;
	height: fit-content;
	.menu-name {
		font-weight: ${({ theme }) => theme.fontWeight.bold};
	}
	.menu-price {
		margin-top: 7px;
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
	}
`;

export default MenuItem;
