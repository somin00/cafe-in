import React, { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import OptionMenu from './UserMode/OptionMenu';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedModeState } from '../state/Mode';
import { MenuType } from '../types/menuMangementType';
import EditMenuModal from './MenuManagement/EditMenuModal';
import ModalPortal from './ModalPortal';
import { selectedItemsState } from '../firebase/FirStoreDoc';

interface ItemPropType {
	menu: MenuType;
}
function MenuItem({ menu }: ItemPropType) {
	const mode = useRecoilValue(selectedModeState);
	const [isOpenModal, setModalOpen] = useState<boolean>(false);

	const [selectedItem, setSelectedItem] = useRecoilState(selectedItemsState);

	const priceTemplate = (price: string) => {
		return price.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	const onClickToggleModal = useCallback(() => {
		setModalOpen(!isOpenModal);
	}, [isOpenModal]);

	return (
		<>
			<MenuItemWrapper>
				<button onClick={onClickToggleModal}>
					{menu.imageUrl ? <img src={menu.imageUrl} alt={`${menu.name}이미지`} /> : <div>이미지 없음</div>}
					<p className="menu-name"> {menu.name}</p>
					<p className="menu-price">{priceTemplate(menu.price)}원</p>
				</button>
			</MenuItemWrapper>
			{mode === 'user' && isOpenModal && (
				<OptionMenu onClickToggleModal={onClickToggleModal} selected={selectedItem}></OptionMenu>
			)}
			{mode === 'admin' && isOpenModal && (
				<ModalPortal>
					<EditMenuModal menu={menu} onCloseModal={onClickToggleModal} />
				</ModalPortal>
			)}
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
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	img {
		width: 218px;
		height: 204px;
	}

	div {
		width: 218px;
		height: 204px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: ${({ theme }) => theme.fontSize['xl']};
		font-weight: ${({ theme }) => theme.fontWeight.regular};
		background-color: ${({ theme }) => theme.textColor.white};
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
