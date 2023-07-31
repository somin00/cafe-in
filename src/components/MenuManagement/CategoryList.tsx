import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { categoryListState, selectedCategoryState } from '../../state/CategoryList';

function CategoryList() {
	const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryState);
	const [categoryList] = useRecoilState(categoryListState);
	return (
		<NavWrapper>
			<ul>
				{categoryList.map(({ id, category }) => (
					<li key={id} className={selectedCategory === category ? 'is-selected' : ''}>
						<button type="button">{category}</button>
					</li>
				))}
			</ul>
		</NavWrapper>
	);
}

export default CategoryList;

export const NavWrapper = styled.nav`
	/* 색상 코드 추가되면 수정 */
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : '#222222')};
	height: 60px;
	ul {
		margin-left: 50px;
		display: flex;
		align-items: center;
	}

	button {
		font-size: ${({ theme }) => theme.fontSize['4xl']};
		color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
		width: 123px;
		height: 60px;
		margin-right: 10px;
	}

	/* 선택된 카테고리만 이 스타일 사용할 것 is-selected 클래스 사용*/
	li.is-selected button {
		/* 색상 코드 추가되면 수정 */
		color: ${({ theme }) => (theme.lightColor ? theme.lightColor?.yellow.sub : '#068FFF')};
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
	}
`;
