import styled from 'styled-components';

export const Nav = styled.nav`
	height: 60px;
	ul {
		margin-left: 50px;
		display: flex;
		align-items: center;
	}

	/* 선택된 카테고리만 이 스타일 사용할 것 */
	li:first-child {
		color: ${({ theme }) => theme.lightColor?.yellow.sub};
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
	}

	button {
		font-size: ${({ theme }) => theme.fontSize['4xl']};
		width: 123px;
		height: 60px;
		margin-right: 10px;
	}
`;
