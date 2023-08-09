import { styled } from 'styled-components';
import { modalState, modalTypeState } from '../../state/ModalState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ModalProps } from '../../types/ModalProps';
import { SelectedColorType } from '../../style/theme';
import { useSelectedColor } from '../../hooks/useSelectedColor';
import { selectedColorState } from '../../state/ColorState';
import { ColorProps } from '../../types/ColorProps';

function WaitingApplyModal({ closeModal }: ModalProps) {
	const [isOpenModal, setIsOpenModal] = useRecoilState<boolean>(modalState);
	const modalType = useRecoilValue<string>(modalTypeState);

	const selectedColor = useRecoilValue<SelectedColorType>(selectedColorState);
	useSelectedColor();

	return (
		<>
			{isOpenModal && <WaitingApplyBackground onClick={closeModal} />}
			<WaitingApplyWrapper>
				{modalType === 'error' ? <h1>대기 신청을 실패하였습니다.</h1> : <h1>대기 신청이 완료되었습니다.</h1>}
				<ApplyModalBtn
					$selectedColor={selectedColor}
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

const ApplyModalBtn = styled.button<ColorProps>`
	width: 90px;
	height: 55px;
	background-color: ${({ theme, $selectedColor }) =>
		theme.lightColor ? theme.lightColor[$selectedColor].sub : theme.darkColor?.main};
	border-radius: 10px;
	color: ${({ theme }) => theme.textColor.white};
	font-size: ${({ theme }) => theme.fontSize['2xl']};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;
