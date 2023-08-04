import React from 'react';
import { styled } from 'styled-components';
import { modalState } from '../../state/ModalState';
import { useRecoilState } from 'recoil';

type modalProps = {
	closeModal?: () => void;
};

function WaitingApplyModal({ closeModal }: modalProps) {
	const [isOpenModal, setIsOpenModal] = useRecoilState<boolean>(modalState);

	return (
		<>
			{isOpenModal && <WaitingApplyBackground onClick={closeModal} />}
			<WaitingApplyWrapper>
				<h1>대기 신청이 완료되었습니다.</h1>
				<ApplyModalBtn
					onClick={() => {
						setIsOpenModal(false);
					}}
				>
					확인
				</ApplyModalBtn>
			</WaitingApplyWrapper>
		</>
	);
}

export default WaitingApplyModal;

const WaitingApplyBackground = styled.div`
	width: 1194px;
	height: 834px;
	background-color: #a8a8a8;
	opacity: 0.65;
	position: absolute;
`;

const WaitingApplyWrapper = styled.div`
	width: 500px;
	height: 250px;
	border-radius: 15px;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.darkColor?.background)};
	color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
	position: absolute;
	top: 35%;
	left: 30%;

	h1 {
		font-size: ${({ theme }) => theme.fontSize['3xl']};
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
		margin-bottom: 50px;
		margin-top: 60px;
	}
`;

const ApplyModalBtn = styled.button`
	width: 90px;
	height: 55px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor?.yellow.sub : theme.darkColor?.main)};
	border-radius: 10px;
	color: ${({ theme }) => theme.textColor.white};
	font-size: ${({ theme }) => theme.fontSize['2xl']};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;
