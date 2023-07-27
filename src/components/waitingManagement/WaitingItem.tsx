import React from 'react';
import { styled } from 'styled-components';

function WaitingItem() {
	return (
		<WaitingItemWrapper>
			<td width={'130px'}>111번</td>
			<td width={'110px'}>홍길동동</td>
			<td width={'120px'}>21명</td>
			<td width={'250px'}>010-1234-5678</td>
			<WatingBtnWrapper width={'300px'}>
				<ShortBtn>알림</ShortBtn>
				<ShortBtn>취소</ShortBtn>
				<LongBtn>착석 완료</LongBtn>
			</WatingBtnWrapper>
		</WaitingItemWrapper>
	);
}

export default WaitingItem;

const WaitingItemWrapper = styled.tr`
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.darkColor?.background)};
	color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
	border: ${({ theme }) => (theme.lightColor ? 'none' : `1px solid ${theme.textColor.white}`)};
	width: 982px;
	height: 72px;
	border-radius: 10px;
	display: flex;
	align-items: center;
	padding-left: 40px;
	padding-right: 30px;
	margin: 0 auto;
	margin-bottom: 12px;
	font-size: ${({ theme }) => theme.fontSize['2xl']};

	td {
		display: flex;
		justify-content: center;
	}
`;

const WatingBtnWrapper = styled.td`
	width: 300px;
	height: 48px;
	color: ${({ theme }) => theme.textColor.white};
	display: flex;
	justify-content: center;
`;

const ShortBtn = styled.button`
	width: 65px;
	height: 48px;
	margin-right: 14px;
	border-radius: 10px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor?.yellow.sub : theme.darkColor?.main)};
`;

const LongBtn = styled.button`
	width: 113px;
	height: 48px;
	border-radius: 10px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor?.yellow.sub : theme.darkColor?.main)};
`;
