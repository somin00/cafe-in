import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { isWaitingAvailableState } from '../../state/WaitingState';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { WaitingDataType } from '../../types/waitingDataType';
import { filterTodayWaiting } from '../../utils/filter';
import { modalState } from '../../state/ModalState';
import WaitingApplyModal from '../../components/waitingManagement/WaitingApplyModal';

type DecreaseProps = {
	$decreaseDisable: boolean;
};

function Waiting() {
	const navigate = useNavigate();
	const isWaitingAvailable = useRecoilValue<boolean>(isWaitingAvailableState);

	//* 대기 신청 확인 모달
	const [isOpenModal, setIsOpenModal] = useRecoilState<boolean>(modalState);

	const [isNavigate, setIsNavigate] = useState<boolean>(false);

	const closeModal = () => {
		setIsOpenModal(false);
	};

	//* 기존 대기 데이터
	const [currentData, setCurrentData] = useState<WaitingDataType[]>([]);
	//* 기존 대기 데이터 수
	const [currentWaitingNum, setCurrentWaitingNum] = useState<number>(0);

	//* 당일 날짜의 현재 대기 팀 수
	const filteredWaitingNum = useMemo(() => filterTodayWaiting(currentData, 'waiting').length, [currentData]);

	//* 대기 신청 시 필수 입력 값
	const [waitingPersonNum, setWaitingPersonNum] = useState<number>(1);
	const [decreaseDisable, setDecreaseDisable] = useState<boolean>(false);
	const [waitingName, setWaitingName] = useState<string>('');
	const [waitingTel, setWaitingTel] = useState<string>('');

	//* 유효성 검사 시 필요한  useRef
	const nameInput = useRef<HTMLInputElement>(null);
	const telInput = useRef<HTMLInputElement>(null);

	const [msg, setMsg] = useState<string>('');
	const [inputError, setInputError] = useState<boolean>(false);

	//* 인원 수 더하기, 빼기 함수
	const onIncrease = () => {
		setWaitingPersonNum((prevNum) => prevNum + 1);
	};

	const onDecrease = () => {
		if (!decreaseDisable) {
			setWaitingPersonNum((prevNum) => prevNum - 1);
		}
	};

	useEffect(() => {
		if (!isOpenModal && isNavigate) {
			navigate('/waitingcheck', {
				state: {
					userWaitingNum: currentWaitingNum + 1,
				},
			});
		}
	}, [isOpenModal, isNavigate]);

	//* 기존 대기 데이터와 기존 전체 대기 팀 수를 업데이트
	useEffect(() => {
		const waitingCollection = collection(db, 'waitingList');
		const getWaitingData = async () => {
			try {
				const data = await getDocs(waitingCollection);
				const dataArray = data.docs.map((doc) => ({
					id: doc.id,
					...(doc.data() as WaitingDataType),
				}));

				setCurrentData(dataArray);
				setCurrentWaitingNum(dataArray.length);
			} catch (error) {
				console.error('Error getting waiting data:', error);
			}
		};

		getWaitingData();
	}, []);

	//* 인원 수를 선택하는 버튼의 활성/비활성 상태를 관리
	useEffect(() => {
		//* 인원 수 선택 버튼 disable 관리
		if (waitingPersonNum === 1) {
			setDecreaseDisable(true);
		} else {
			setDecreaseDisable(false);
		}
	}, [waitingPersonNum]);

	// *유효성 검사
	// - 필수 입력값 입력하지 않았을 때 입력창으로 focus
	const applyWaiting = async () => {
		const waitingCollection = collection(db, 'waitingList');

		if (waitingName.length === 0 && nameInput.current != null) {
			setInputError(true);
			setMsg('이름을 입력해주세요.');
			nameInput.current.focus();
			return;
		}

		const telRule = /^010[0-9]{3,4}[0-9]{4}$/;

		if (telInput.current !== null) {
			if (waitingTel.length !== 0 && !telRule.test(waitingTel.toString())) {
				setInputError(true);
				setMsg('전화번호 형식에 맞게 입력해주세요.');
				telInput.current.focus();
				return;
			} else if (waitingTel.length === 0 || waitingTel.length !== 11) {
				setInputError(true);
				setMsg('전화번호 11자리를 입력해주세요.');
				telInput.current.focus();
				return;
			}
		}

		await addDoc(waitingCollection, {
			name: waitingName,
			tel: waitingTel,
			date: new Date().getTime(),
			personNum: waitingPersonNum,
			no: currentWaitingNum + 1,
			status: 'waiting',
		});

		setIsOpenModal(true);

		//? 방금 대기 신청한 대기 번호 -> 대기 완료 페이지로 넘기기
		setIsNavigate(true);
	};

	return (
		<WaitingWrapper>
			{isWaitingAvailable ? (
				<>
					{isOpenModal && <WaitingApplyModal closeModal={closeModal} />}
					<WaitingHeaderText>
						{filteredWaitingNum} 팀이 <p> 대기중이에요</p>
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
								ref={nameInput}
								onChange={(event) => {
									setWaitingName(event.target.value);
								}}
								required
							/>
							<InputBox
								type="tel"
								placeholder="전화 번호를 입력해주세요."
								ref={telInput}
								onChange={(event) => {
									setWaitingTel(event.target.value);
								}}
								required
							/>
							{inputError ? <h1>{msg}</h1> : <h1>&nbsp;</h1>}
						</InputBoxWrapper>
						<ApplicationButtnoWrapper>
							<ApplicationBtn
								onClick={() => {
									navigate(-1);
								}}
							>
								취소
							</ApplicationBtn>
							<ApplicationBtn
								onClick={() => {
									applyWaiting();
								}}
							>
								신청
							</ApplicationBtn>
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
	position: relative;
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
	height: 220px;

	h1 {
		padding-left: 5px;
		font-size: ${({ theme }) => theme.fontSize.lg};
		color: ${({ theme }) => (theme.lightColor ? theme.lightColor.pink.point : theme.darkColor?.point)};
	}
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
