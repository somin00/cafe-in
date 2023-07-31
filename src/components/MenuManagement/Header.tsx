import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import CategoryManagementModal from './CategoryManagementModal';
import ModalPortal from '../ModalPortal';
import AddMenuModal from './AddMenuModal';
import { useNavigate } from 'react-router-dom';

function Header() {
	const navigate = useNavigate();
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
				<ImageContainer
					onClick={() => {
						navigate(-1);
					}}
				>
					<img alt="뒤로가기" />
				</ImageContainer>
				<h1>메뉴관리</h1>
				<ButtonContainer>
					<button type="button" onClick={handleOpenCategoryModal}>
						카테고리 관리
					</button>
					<button type="button" onClick={handleOpenAddMenuModal}>
						메뉴 추가
					</button>
				</ButtonContainer>
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
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.darkColor?.background)};
	height: 80px;
	display: flex;
	align-items: center;

	h1 {
		font-size: ${({ theme }) => theme.fontSize['4xl']};
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
		color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
		margin: 0 227px 0 449px;
	}
`;

const ImageContainer = styled.button`
	margin-left: 33px;
	width: 60px;
	img {
		content: ${({ theme }) =>
			theme.lightColor ? 'url(/assets/admin/back_light.svg)' : 'url(/assets/admin/back_dark.svg)'};
	}
`;

const ButtonContainer = styled.div`
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
