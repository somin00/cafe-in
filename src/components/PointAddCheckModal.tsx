import React from 'react';
import { styled } from 'styled-components';
import { ModalandModalType } from '../state/ModalOpen';

function PointAddCheckModal({ onClickOpenModal }: ModalandModalType) {
	const handleCloseBtnClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		onClickOpenModal();
	};
	return (
		<ModalContainer onClick={onClickOpenModal}>
			<DialogBox onClick={(e) => e.stopPropagation()}>
				<p> 이용약관과 개인 정보 취급 방침에 동의하시면 적립 버튼을 눌러주세요 </p>

				<CloseBtn onClick={handleCloseBtnClick}>취소</CloseBtn>
			</DialogBox>
			<Backdrop
				onClick={(e: React.MouseEvent) => {
					e.preventDefault();
					if (onClickOpenModal) {
						onClickOpenModal();
					}
				}}
			/>
		</ModalContainer>
	);
}
const ModalContainer = styled.div`
	width: 100%;
	height: 100%;
`;
const DialogBox = styled.dialog`
	width: 700px;
	height: 500px;
	position: absolute;
	top: 150px;
	left: 280px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.lightColor?.yellow.background};
	border: none;
	border-radius: 10px;
	box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
	box-sizing: border-box;
	z-index: 10000;
	p {
		font-size: ${({ theme }) => theme.fontSize.sm};
		color: ${({ theme }) => theme.textColor.lightgray};
	}
`;
const CloseBtn = styled.button`
	margin-top: 10px;
	margin-left: 10px;
	border-radius: 10px;
	background-color: ${({ theme }) => theme.lightColor?.yellow.main};
	width: 110px;
	height: 45px;
	font-size: ${({ theme }) => theme.fontSize['2xl']};
	color: ${({ theme }) => theme.textColor.black};
`;
const Backdrop = styled.div`
	width: 1194px;
	height: 834px;
	position: fixed;
	top: 0;
	left: 50%;
	transform: translate(-50%, 0); /* 추가 */
	z-index: 9999;
	background-color: rgba(0, 0, 0, 0.2);
`;
export default PointAddCheckModal;
