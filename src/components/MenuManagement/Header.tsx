import React from 'react';
import styled from 'styled-components';
function Header() {
	return (
		<HeadWrapper>
			<ImageContainer>
				<img src="/assets/admin/back_light.svg" alt="뒤로가기" />
			</ImageContainer>
			<h1>메뉴관리</h1>
			<ButtonContainer>
				<button type="button">카레고리 관리</button>
				<button type="button">메뉴 추가</button>
			</ButtonContainer>
		</HeadWrapper>
	);
}

export default Header;

const HeadWrapper = styled.header`
	background-color: ${({ theme }) => theme.textColor.white};
	height: 80px;
	display: flex;
	align-items: center;

	h1 {
		font-size: ${({ theme }) => theme.fontSize['4xl']};
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
		margin: 0 227px 0 449px;
	}
`;

const ImageContainer = styled.button`
	margin-left: 33px;
	width: 60px;
`;

const ButtonContainer = styled.div`
	button {
		width: 140px;
		height: 56px;
		background-color: ${({ theme }) => theme.lightColor?.yellow.point};
		border-radius: 10px;
		font-size: ${({ theme }) => theme.fontSize['xl']};
		color: ${({ theme }) => theme.textColor.white};
		&:first-child {
			margin-right: 6px;
		}
	}
`;
