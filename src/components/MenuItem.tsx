import React, { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import OptionMenu from './OptionMenu';

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
	background-color: ${({ theme }) => theme.textColor?.white};
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
const ModalTitle = styled.div`
	color: orange;
	margin-top: 30px;
	font-size: 32px;
`;
const ModalContents = styled.div`
	color: orange;
	margin-top: 10px;
	font-size: 18px;
`;

const DialogButton = styled.button`
	width: 160px;
	height: 48px;
	background-color: cornflowerblue;
	color: white;
	font-size: 1.2rem;
	font-weight: 400;
	border-radius: 50px;
	border: none;
	margin-top: 200px;
	cursor: pointer;
`;
const CloseButton = styled.button`
	background: none;
	color: gray;
	border: 2px solid;
	padding: 5px 20px;
	font-size: 18px;
	transition:
		color 0.2s,
		border-color 1s,
		transform 0.5s;
	position: absolute;
	bottom: 10px;
	right: 20px;

	cursor: pointer;

	&:hover {
		border-color: black;
		color: black;
		box-shadow: 0 0.5em 0.5em -0.4em;
		transform: translateY(-5px);
		cursor: pointer;
	}
`;

export default MenuItem;
