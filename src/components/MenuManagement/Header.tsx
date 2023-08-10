import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import CategoryManagementModal from './CategoryManagementModal';
import ModalPortal from '../ModalPortal';
import AddMenuModal from './AddMenuModal';
import ManagementHeader from '../adminMode/ManagementHeader';

function Header() {
	const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);
	const [isAddMenuModalOpen, setIsAddMenuModalOpen] = useState<boolean>(false);

	const handleOpenCategoryModal = useCallback(() => {
		setIsCategoryModalOpen((prev) => !prev);
	}, []);

	const handleOpenAddMenuModal = useCallback(() => {
		setIsAddMenuModalOpen((prev) => !prev);
	}, []);

	return (
		<>
			<HeadWrapper>
				<ManagementHeader headerText="메뉴 추가">
					<ButtonContainer>
						<button type="button" onClick={handleOpenCategoryModal}>
							카테고리 관리
						</button>
						<button type="button" onClick={handleOpenAddMenuModal}>
							메뉴 추가
						</button>
					</ButtonContainer>
				</ManagementHeader>
			</HeadWrapper>
			{isCategoryModalOpen && (
				<ModalPortal>
					<CategoryManagementModal onClickToggleModal={handleOpenCategoryModal} />
				</ModalPortal>
			)}
			{isAddMenuModalOpen && (
				<ModalPortal>
					<AddMenuModal onClickToggleModal={handleOpenAddMenuModal} />
				</ModalPortal>
			)}
		</>
	);
}

export default Header;

const HeadWrapper = styled.header`
	display: flex;
	align-items: center;
`;

const ButtonContainer = styled.div`
	display: flex;
	button {
		width: 140px;
		height: 56px;
		background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor?.yellow.point : theme.textColor.white)};
		border-radius: 10px;
		font-size: ${({ theme }) => theme.fontSize['xl']};
		color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.textColor.black)};
		&:first-child {
			margin-right: 6px;
		}
	}
`;
