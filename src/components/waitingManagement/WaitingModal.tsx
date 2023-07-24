import React from 'react';
import { styled } from 'styled-components';

function WaitingModal() {
	return (
		<WaitingModalWrapper>
			<h1>대기를 취소하시겠습니까?</h1>
			<ModalBtnWrapper>
				<ModalBtn>예</ModalBtn>
				<ModalBtn>아니오</ModalBtn>
			</ModalBtnWrapper>
		</WaitingModalWrapper>
	);
}

export default WaitingModal;

const WaitingModalWrapper = styled.div`
	width: 622px;
	height: 454px;
	border-radius: 15px;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.darkColor?.background)};
	color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};

	h1 {
		font-size: ${({ theme }) => theme.fontSize['3xl']};
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
		margin-bottom: 90px;
		margin-top: 80px;
	}
`;

const ModalBtnWrapper = styled.div`
	width: 289px;
	height: 65px;
	display: flex;
	justify-content: space-between;
`;

const ModalBtn = styled.button`
	width: 110px;
	height: 65px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor?.yellow.sub : theme.darkColor?.main)};
	border-radius: 10px;
	color: ${({ theme }) => theme.textColor.white};
	font-size: ${({ theme }) => theme.fontSize['3xl']};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;
