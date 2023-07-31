import React from 'react';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import { modalItemId, modalState, modalTypeState, modalUpdateState } from '../../state/modalState';

type modalProps = {
	closeModal?: () => void;
};

function WaitingModal({ closeModal }: modalProps) {
	const [isOpenModal, setIsOpenModal] = useRecoilState<boolean>(modalState);

	const [modalType, setModalType] = useRecoilState<string>(modalTypeState);

	const [modalUpdate, setModalUpdate] = useRecoilState<boolean>(modalUpdateState);

	return (
		<>
			{isOpenModal && <WaitingModalBackground onClick={closeModal} />}
			<WaitingModalWrapper>
				{modalType === 'notification' ? (
					<h1>알림을 보내시겠습니까?</h1>
				) : modalType === 'cancel' ? (
					<h1>대기를 취소하시겠습니까?</h1>
				) : (
					<h1>착석 완료를 선택하시겠습니까?</h1>
				)}
				<ModalBtnWrapper>
					<ModalBtn
						onClick={() => {
							setIsOpenModal(false);
							setModalUpdate(true);
						}}
					>
						예
					</ModalBtn>
					<ModalBtn
						onClick={() => {
							setIsOpenModal(false);
							setModalUpdate(false);
						}}
					>
						아니오
					</ModalBtn>
				</ModalBtnWrapper>
			</WaitingModalWrapper>
		</>
	);
}

export default WaitingModal;

const WaitingModalBackground = styled.div`
	width: 1194px;
	height: 834px;
	background-color: #a8a8a8;
	opacity: 0.65;
	position: absolute;
`;

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
	position: absolute;
	top: 20%;
	left: 25%;

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
