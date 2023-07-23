import React from 'react';
import { styled } from 'styled-components';
import CategoryItem from './CategoryItem';

function CategoryManagementModal() {
	return (
		<CategoryManagementWrapper>
			<AddContainer>
				<input type="text" />
				<button type="button">추가</button>
			</AddContainer>
			<ul>
				<CategoryItem />
			</ul>
			<ButtonContainer>
				<button type="button">완료</button>
				<button type="button">취소</button>
			</ButtonContainer>
		</CategoryManagementWrapper>
	);
}

export default CategoryManagementModal;
const CategoryManagementWrapper = styled.div`
	width: 492px;
	height: 758px;
	background-color: ${({ theme }) => theme.lightColor?.yellow.background};
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: start;
	padding: 50px 0 0 58px;

	ul {
		display: flex;
		flex-direction: column;
		height: 472px;
		grid-row-gap: 26px;
		margin-bottom: 30px;
		overflow-y: auto;
	}
`;

const AddContainer = styled.div`
	display: flex;
	margin-bottom: 25px;

	input {
		width: 262px;
		height: 66px;
		background-color: ${({ theme }) => theme.textColor.white};
		border: none;
		border-radius: 10px;
		margin-right: 17px;
	}

	button {
		width: 97px;
		height: 66px;
		background-color: ${({ theme }) => theme.lightColor?.yellow.main};
		color: ${({ theme }) => theme.textColor.white};
		border-radius: 10px;
		font-size: ${({ theme }) => theme.fontSize['3xl']};
		font-weight: ${({ theme }) => theme.fontWeight.regular};
	}
`;

const ButtonContainer = styled.div`
	padding-left: 33px;

	button {
		width: 146px;
		height: 57px;
		background-color: ${({ theme }) => theme.lightColor?.yellow.main};
		color: ${({ theme }) => theme.textColor.white};
		border-radius: 10px;
		font-size: ${({ theme }) => theme.fontSize['3xl']};
		font-weight: ${({ theme }) => theme.fontWeight.regular};
	}
	button:first-child {
		margin-right: 24px;
	}
`;
