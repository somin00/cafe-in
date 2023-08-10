import React, { useState } from 'react';
import { styled, useTheme } from 'styled-components';
import { ModalContainer } from './UsePointUser';
import { CloseBtn, PointInput } from './AddPointModal';
import { darkTheme, defaultTheme } from '../../style/theme';
import { ModalAndModalType } from '../../types/ModalOpenTypes';
interface CheckPointUsedIt extends ModalAndModalType {
	onClickOpenModal: () => void;
	isOpenModal: boolean;
	points: number | null;
}
function CheckPointUsedIt({ isOpenModal, onClickOpenModal, points }: CheckPointUsedIt) {
	const theme = useTheme();
	const [point, setPoint] = useState('');

	const handleCloseBtnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.stopPropagation();
		setPoint(e.target.value);
		onClickOpenModal();
		console.log(points);
	};

	return isOpenModal ? (
		<ModalContainer onClick={onClickOpenModal}>
			<DialogBox onClick={(e) => e.stopPropagation()}>
				<div className="guide-ment">
					<p>0 0 0 0 님, </p>
					<p>사용하실 포인트 입력 해주세요 </p>
					<img
						src={theme === defaultTheme ? '/assets/user/yellowcloud_light.svg' : '/assets/user/pinkcloud_dark.svg'}
						alt=""
						width={95}
					/>
				</div>
				<div className="point-check-allBtn">
					<button onClick={() => setPoint(point?.toString() ?? '')}>전액</button>
					<p>잔여 : {points?.toLocaleString() ?? '0'} point</p>
				</div>
				<InputExplain>
					<label htmlFor="point" hidden />
					<input type="number" id="point" name="point" value={point} placeholder="숫자만 입력해주세요"></input>
					<p>1,000 포인트 이상 사용 가능합니다. </p>
				</InputExplain>
				<BtnContainer>
					<CloseBtn onClick={() => handleCloseBtnClick}>확인</CloseBtn>
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
	background-color: ${({ theme }) => (theme === defaultTheme ? theme.textColor.white : darkTheme.textColor.black)};
	border: none;
	border-radius: 10px;
	box-sizing: border-box;
	z-index: 10000;
	.guide-ment {
		position: relative;
		text-align: center;
		font-weight: ${({ theme }) => theme.fontWeight.bold};
		font-size: ${({ theme }) => theme.fontSize['3xl']};
		color: ${({ theme }) => (theme === defaultTheme ? theme.textColor.black : darkTheme.textColor.white)};
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
	.point-check-allBtn {
		display: flex;
		align-items: end;
		justify-content: space-between;
		width: 370px;
		padding-top: 50px;
		font-size: ${({ theme }) => theme.fontSize.sm};
		button {
			background-color: ${({ theme }) => theme.textColor.lightgray};
			padding: 5px 20px;
			border-radius: 10px;
		}
		p {
			color: ${({ theme }) => (theme === defaultTheme ? theme.textColor.black : darkTheme.textColor.lightgray)};
		}
	}
`;

const InputExplain = styled(PointInput)`
	p {
		font-size: ${({ theme }) => theme.fontSize.sm};
		color: ${({ theme }) => theme.textColor.lightgray};
		display: flex;
		justify-content: end;
		margin: 10px 0;
	}
`;
export default CheckPointUsedIt;
