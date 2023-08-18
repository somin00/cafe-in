import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryListState, selectedCategoryState } from '../../state/CategoryList';

function CategoryList() {
	const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryState);
	const categoryList = useRecoilValue(categoryListState);

	const handleSelectCategory = (e: MouseEvent) => {
		const categoryName = e.currentTarget;
		if (categoryName.textContent) setSelectedCategory(categoryName.textContent);
	};
	return (
		<NavWrapper>
			<ul>
				{categoryList.map(({ id, category }) => (
					<li key={id} className={selectedCategory === category ? 'is-selected' : ''}>
						<button type="button" onClick={handleSelectCategory}>
							{category}
						</button>
					</li>
				))}
			</ul>
		</NavWrapper>
	);
}

export default CategoryList;

export const NavWrapper = styled.nav`
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.darkColor.background)};
	height: 60px;
	ul {
		margin-left: 50px;
		display: flex;
		align-items: center;
	}

	button {
		font-size: ${({ theme }) => theme.fontSize['4xl']};
		color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
		height: 60px;
		margin-right: 50px;
	}

	li.is-selected button {
		color: ${({ theme }) =>
			theme.lightColor
				? theme.color === 'blue'
					? theme.lightColor.main
					: theme.lightColor.point
				: theme.darkColor.main};
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
	}
`;
