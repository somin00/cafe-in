import React from 'react';
import { styled } from 'styled-components';

function WaitingHeader() {
	return (
		<WaitingHeaderWrapper>
			<img src={process.env.PUBLIC_URL + '/assets/admin/back_light.svg'} alt="뒤로가기 버튼" />
			<HeaderTitle>대기 관리</HeaderTitle>
		</WaitingHeaderWrapper>
	);
}

export default WaitingHeader;

const WaitingHeaderWrapper = styled.div`
	height: 80px;
	width: 1194px;
	padding-left: 33px;
	padding-right: 33px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: ${({ theme }) => theme.fontSize['4xl']};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	background-color: ${({ theme }) => theme.textColor.white};
`;

const HeaderTitle = styled.h1`
	width: 1101px;
	padding-right: 25px;
	display: flex;
	justify-content: center;
`;
