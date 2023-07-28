import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { categoryListState } from '../../state/CategoryList';

function CategoryItem() {
	const [categoryList] = useRecoilState(categoryListState);

	return (
		<>
			{categoryList.map(({ id, category }) => (
				<CategoryItemWrapper key={id}>
					<span>{category}</span>
					<AddCategoryButton type="button">수정</AddCategoryButton>
					<button type="button">삭제</button>
				</CategoryItemWrapper>
			))}
		</>
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
		/* 색상 코드 추가되면 수정 */
		background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor?.yellow.main : '#068FFF')};
		color: ${({ theme }) => theme.textColor.white};
		border-radius: 10px;
		font-size: ${({ theme }) => theme.fontSize['2xl']};
		font-weight: ${({ theme }) => theme.fontWeight.regular};
	}
`;

const AddCategoryButton = styled.button`
	margin-right: 3px;
`;
