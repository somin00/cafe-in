import React from 'react';
import styled from 'styled-components';

function CategoryItem() {
	return (
		<CategoryItemWrapper>
			<span>커피</span>
			<AddCategoryButton type="button">수정</AddCategoryButton>
			<button type="button">삭제</button>
		</CategoryItemWrapper>
	);
}

export default CategoryItem;

const CategoryItemWrapper = styled.li`
	display: flex;

	span {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 191px;
		height: 57px;
		background-color: ${({ theme }) => theme.textColor.white};
		margin-right: 16px;
		font-size: ${({ theme }) => theme.fontSize['3xl']};
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
		border-radius: 10px;
	}

	button {
		width: 83px;
		height: 57px;
		background-color: ${({ theme }) => theme.lightColor?.yellow.main};
		color: ${({ theme }) => theme.textColor.white};
		border-radius: 10px;
		font-size: ${({ theme }) => theme.fontSize['2xl']};
		font-weight: ${({ theme }) => theme.fontWeight.regular};
	}
`;

const AddCategoryButton = styled.button`
	margin-right: 3px;
`;
