import { styled } from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { ModalProps } from '../../types/ModalProps';
import { ColorProps } from '../../types/ColorProps';
import { SelectedColorType } from '../../style/theme';
import { modalState, modalTypeState, modalUpdateState, notificationUserState } from '../../state/ModalState';
import { selectedColorState } from '../../state/ColorState';
import { useSelectedColor } from '../../hooks/useSelectedColor';

function WaitingModal({ closeModal }: ModalProps) {
	const selectedColor = useRecoilValue<SelectedColorType>(selectedColorState);
	useSelectedColor();
	const [isOpenModal, setIsOpenModal] = useRecoilState<boolean>(modalState);
	const modalType = useRecoilValue<string>(modalTypeState);
	const setModalUpdate = useSetRecoilState<boolean>(modalUpdateState);
	const notificationUser = useRecoilValue<string>(notificationUserState);

	return (
		<>
			{isOpenModal && <WaitingModalBackground onClick={closeModal} />}
			<WaitingModalWrapper>
				{modalType === 'notification' ? (
					<h1>{notificationUser} 님에게 알림을 보내시겠습니까?</h1>
				) : modalType === 'cancel' ? (
					<h1>대기를 취소하시겠습니까?</h1>
				) : (
					<h1>착석 완료를 선택하시겠습니까?</h1>
				)}
				<ModalBtnWrapper>
					<ModalBtn
						$selectedColor={selectedColor}
						onClick={() => {
							setIsOpenModal(false);
							setModalUpdate(true);
						}}
					>
						예
					</ModalBtn>
					<ModalBtn
						$selectedColor={selectedColor}
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

const ModalBtn = styled.button<ColorProps>`
	width: 110px;
	height: 65px;
	background-color: ${({ theme, $selectedColor }) =>
		theme.lightColor ? theme.lightColor[$selectedColor].sub : theme.darkColor?.main};
	border-radius: 10px;
	color: ${({ theme }) => theme.textColor.white};
	font-size: ${({ theme }) => theme.fontSize['3xl']};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;
