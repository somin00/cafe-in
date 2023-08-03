import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { isWaitingAvailableState } from '../../state/WaitingState';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { WaitingDataType } from '../../types/waitingDataType';

type DecreaseProps = {
	$decreaseDisable: boolean;
};

function Waiting() {
	const navigate = useNavigate();

	const isWaitingAvailable = useRecoilValue<boolean>(isWaitingAvailableState);
	const [waitingNum, setWaitingNum] = useState<number>(0);

	// 대기 신청 데이터 담을 변수
	const [waitingDatas, setWaitingDatas] = useState<WaitingDataType[]>([]);

	// 대기 신청 시 필수 입력 값
	const [waitingPersonNum, setWaitingPersonNum] = useState<number>(1);
	const [decreaseDisable, setDecreaseDisable] = useState<boolean>(false);
	const [waitingName, setWaitingName] = useState<string>('');
	const [waitingTel, setWaitingTel] = useState<string>('');

	const onIncrease = () => {
		setWaitingPersonNum((prevNum) => prevNum + 1);
	};

	const onDecrease = () => {
		if (!decreaseDisable) {
			setWaitingPersonNum((prevNum) => prevNum - 1);
		}
	};

	// 문서의 길이 = 대기 길이 가져오기
	const getWaitingNum = async () => {
		try {
			const querySnapshot = await getDocs(collection(db, 'waitingList'));
			setWaitingNum(querySnapshot.size);
		} catch (error) {
			console.error('Error getting waitingNum:', error);
		}
	};

	useEffect(() => {
		// 대기 팀 수 가져오기
		getWaitingNum();

		// 인원 수 선택 버튼 disable 관리
		if (waitingPersonNum === 0) {
			setDecreaseDisable(true);
		} else {
			setDecreaseDisable(false);
		}
	}, [waitingNum, waitingPersonNum]);

	return (
		<WaitingWrapper>
			{isWaitingAvailable ? (
				<>
					<WaitingHeaderText>
						{waitingNum} 팀이 <p> 대기중이에요</p>
					</WaitingHeaderText>
					<ApplicationBox>
						<ApplicationHeaderText>대기를 원하시면 번호를 입력해주세요.</ApplicationHeaderText>
						<NumCheckBox>
							<MinusBtn onClick={onDecrease} $decreaseDisable={decreaseDisable}>
								<img alt="1 빼기 버튼" aria-label="1 빼기" />
							</MinusBtn>
							{waitingPersonNum}
							<PlusBtn onClick={onIncrease}>
								<img alt="1 더하기 버튼" aria-label="1 더하기" />
							</PlusBtn>
						</NumCheckBox>
						<InputBoxWrapper>
							<InputBox
								type="text"
								placeholder="이름을 입력해주세요."
								onChange={(event) => {
									setWaitingName(event.target.value);
								}}
								required
							/>
							<InputBox
								type="tel"
								placeholder="전화 번호를 입력해주세요."
								onChange={(event) => {
									setWaitingTel(event.target.value);
								}}
								required
							/>
						</InputBoxWrapper>
						<ApplicationButtnoWrapper>
							<ApplicationBtn
								onClick={() => {
									navigate(-1);
								}}
							>
								취소
							</ApplicationBtn>
							<ApplicationBtn onClick={() => navigate('/waitingcheck')}>신청</ApplicationBtn>
						</ApplicationButtnoWrapper>
					</ApplicationBox>
				</>
			) : (
				<WaitingDisableMessage>
					대기가 마감되었습니다.
					<BackHomeBtn
						onClick={() => {
							navigate('/home');
						}}
					>
						홈화면으로 돌아가기
					</BackHomeBtn>
				</WaitingDisableMessage>
			)}
		</WaitingWrapper>
	);
}

export default Waiting;

const WaitingWrapper = styled.div`
	width: 1194px;
	height: 834px;
	background-color: ${({ theme }) =>
		theme.lightColor ? theme.lightColor?.yellow.background : theme.darkColor?.background};
	user-select: none;
	display: flex;
	align-items: center;
	flex-flow: column nowrap;
`;

const WaitingHeaderText = styled.h1`
	width: 208px;
	height: 96px;
	margin-top: 56px;
	margin-bottom: 26px;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	font-size: ${({ theme }) => theme.fontSize['5xl']};
	color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};

	p {
		margin-top: 5px;
	}
`;

const ApplicationBox = styled.div`
	width: 628px;
	height: 582px;
	border-radius: 10px;
	border: 1px solid ${({ theme }) => theme.textColor.lightgray};
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.darkColor?.background)};
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: space-around;
`;

const ApplicationHeaderText = styled.h2`
	width: 420px;
	height: 32px;
	margin-top: 20px;
	font-size: ${({ theme }) => theme.fontSize['3xl']};
	color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
`;

const NumCheckBox = styled.div`
	width: 327px;
	height: 96px;
	font-size: ${({ theme }) => theme.fontSize['6xl']};
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 16px;
	padding-right: 16px;
	color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
`;

const MinusBtn = styled.button<DecreaseProps>`
	img {
		content: ${({ theme, $decreaseDisable }) =>
			$decreaseDisable
				? 'url(/assets/user/minusIcon_disable.svg)'
				: theme.lightColor
				? 'url(/assets/user/minusIcon_able_light.svg)'
				: 'url(/assets/user/minusIcon_dark.svg)'};
	}

	cursor: ${({ $decreaseDisable }) => ($decreaseDisable ? 'not-allowed' : 'pointer')};
`;

const PlusBtn = styled.button`
	img {
		content: ${({ theme }) =>
			theme.lightColor ? 'url(/assets/user/plusIcon_light.svg)' : 'url(/assets/user/plusIcon_dark.svg)'};
	}
`;

const InputBoxWrapper = styled.div`
	width: 400px;
`;
const InputBox = styled.input`
	width: 400px;
	height: 70px;
	border-radius: 10px;
	background-color: ${({ theme }) => theme.textColor.lightbrown};
	margin-bottom: 26px;
	font-size: ${({ theme }) => theme.fontSize['2xl']};
	border: none;
	padding-left: 15px;

	::placeholder {
		color: ${({ theme }) => theme.textColor.darkgray};
		font-size: ${({ theme }) => theme.fontSize['2xl']};
	}
`;

const ApplicationButtnoWrapper = styled.div`
	width: 359px;
	height: 64px;
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
`;

const ApplicationBtn = styled.button`
	width: 168px;
	height: 64px;
	border-radius: 10px;
	color: ${({ theme }) => theme.textColor.white};

	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.darkbrown : theme.textColor.darkgray)};
	font-size: ${({ theme }) => theme.fontSize['2xl']};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

const WaitingDisableMessage = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	font-size: ${({ theme }) => theme.fontSize['5xl']};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
`;

const BackHomeBtn = styled.button`
	width: 225px;
	height: 75px;
	border-radius: 10px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor?.yellow.main : theme.darkColor?.main)};
	color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
	font-size: ${({ theme }) => theme.fontSize['2xl']};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	margin-top: 50px;
`;
