import React from 'react';
import { ModalandModalType } from '../state/ModalOpen';
import { styled } from 'styled-components';
import { CloseBtn, ModalContainer, PointInput } from './UsePointUser';
interface CheckPointUsedIt extends ModalandModalType {
	isOpenModal: boolean;
}
function CheckPointUsedIt({ isOpenModal, onClickOpenModal }: CheckPointUsedIt) {
	const handleCloseBtnClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		onClickOpenModal();
	};
	return isOpenModal ? (
		<ModalContainer onClick={onClickOpenModal}>
			<DialogBox onClick={(e) => e.stopPropagation()}>
				<div className="guide-ment">
					<p>0 0 0 0 님, </p>
					<p>사용하실 포인트 입력 해주세요 </p>
					<img src="/assets/user/yellowcloud_light.svg" alt="" width={95} />
				</div>
				<PointInput>
					<label htmlFor="phone-number" hidden />
					<input type="number" id="phone-number" name="phonnumber" placeholder="숫자만 입력해주세요"></input>
					<button>
						<img src="/assets/user/BackBtn.svg" alt="지우기" width={45} />
					</button>
				</PointInput>
				<BtnContainer>
					<CloseBtn onClick={handleCloseBtnClick}>확인</CloseBtn>
				</BtnContainer>
			</DialogBox>
		</ModalContainer>
	) : null;
}
const BtnContainer = styled.div`
	display: flex;
	width: 390px;
	justify-content: flex-end;
	font-size: ${({ theme }) => theme.fontSize['2xl']};
`;
const DialogBox = styled.dialog`
	width: 500px;
	height: 500px;
	position: absolute;
	bottom: 0;
	left: 350px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.textColor.white};
	border: none;
	border-radius: 10px;
	box-sizing: border-box;
	z-index: 10000;
	.guide-ment {
		position: relative;
		text-align: center;
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
		font-size: ${({ theme }) => theme.fontSize['3xl']};
		p {
			padding-top: 10px;
		}
		img {
			position: absolute;
			bottom: -10px;
			left: 95px;
			z-index: -1;
		}
	}
`;

export default CheckPointUsedIt;
