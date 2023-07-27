import React from 'react';
import styled from 'styled-components';

function CategoryList() {
	return (
		<NavWrapper>
			<ul>
				<li className="is-selected">
					<button type="button">커피</button>
				</li>
				<li>
					<button type="button">음료</button>
				</li>
				<li>
					<button type="button">티</button>
				</li>
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
