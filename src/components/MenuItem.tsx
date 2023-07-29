import React, { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import OptionMenu from './OptionMenu';
import { useRecoilValue } from 'recoil';
import { selectedModeState } from '../state/Mode';

function MenuItem() {
	const mode = useRecoilValue(selectedModeState);
	const [isOpenModal, setModalOpen] = useState<boolean>(false);

	const onClickToggleModal = useCallback(() => {
		setModalOpen(!isOpenModal);
	}, [isOpenModal]);

	return (
		<>
			<MenuItemWrapper onClick={onClickToggleModal}>
				<button>
					<img src="/assets/user/IceCoffee.svg" alt="Ice Coffee" />
					<p className="menu-name"> 아메리카노 [Iced]</p>
					<p className="menu-price">4,500원</p>
				</button>
			</MenuItemWrapper>
			{mode === 'user' && isOpenModal && <OptionMenu onClickToggleModal={onClickToggleModal}></OptionMenu>}
		</>
	);
}

export default MenuItem;

const MenuItemWrapper = styled.li`
	background-color: ${({ theme }) => theme.textColor.white};
	border: 1px solid ${({ theme }) => theme.textColor.lightgray};
	border-radius: 15px;
	width: 250px;
	height: 300px;

	button {
		width: 100%;
		height: 100%;
		border-radius: 15px;
	}

	img {
		width: 218px;
		height: 204px;
	}

	.menu-name {
		margin: 17px 0 7px 0;
		font-size: ${({ theme }) => theme.fontSize['xl']};
		font-weight: ${({ theme }) => theme.fontWeight.bold};
	}

	p {
		font-size: ${({ theme }) => theme.fontSize.lg};
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
	}
`;
