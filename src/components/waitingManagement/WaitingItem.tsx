import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
	modalItemId,
	modalState,
	modalTypeState,
	modalUpdateState,
	notificationUserState,
} from '../../state/ModalState';
import { WaitingDataType } from '../../types/waitingDataType';
import { db } from '../../firebase/firebaseConfig';
import { updateDoc, doc } from 'firebase/firestore';
import { SelectedColorType } from '../../style/theme';
import { selectedColorState } from '../../state/ColorState';

type WaitingItemProps = {
	waitingInfo: WaitingDataType[];
	waitingDataStatus: string;
};

type ColorProps = {
	$selectedColor: SelectedColorType;
};

const WaitingItem = (props: WaitingItemProps) => {
	const selectedColor = useRecoilValue<SelectedColorType>(selectedColorState);

	const { waitingInfo, waitingDataStatus } = props;
	const setIsOpenModal = useSetRecoilState<boolean>(modalState);
	const [modalType, setModalType] = useRecoilState<string>(modalTypeState);
	const [itemId, setItemId] = useRecoilState<string | undefined>(modalItemId);
	const modalUpdate = useRecoilValue<boolean>(modalUpdateState);
	const [notificationUser, setNotificationUser] = useRecoilState<string>(notificationUserState);

	// 모달창에서 예를 클릭했을 때 업데이트 (취소, 착석완료만)
	const updateStatus = async (id: string, type: string) => {
		const statusDoc = doc(db, 'waitingList', id);
		try {
			await updateDoc(statusDoc, { status: type });
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		if (itemId && modalUpdate && modalType !== 'notification') {
			updateStatus(itemId, modalType);
		}
	}, [modalUpdate, itemId, modalType]);

	const formatTel = (tel: string) => {
		const cleanNumber = tel.replace(/\D/g, '');
		const firstPart = cleanNumber.slice(0, 3);
		const secondPart = cleanNumber.slice(3, 7);
		const thirdPart = cleanNumber.slice(7);
		return `${firstPart}-${secondPart}-${thirdPart}`;
	};

	const showWaitingList = () => {
		return waitingInfo
			.sort((a, b) => a.no - b.no)
			.map((value) => (
				<WaitingItemWrapper key={value.id}>
					<td width={'130px'}>{value.no}번</td>
					<td width={'110px'}>{value.name}</td>
					<td width={'120px'}>{value.personNum}명</td>
					<td width={'250px'}>{formatTel(value.tel)}</td>
					<WatingBtnWrapper $selectedColor={selectedColor} width={'300px'}>
						{waitingDataStatus === 'waiting' ? (
							<>
								<ShortBtn
									$selectedColor={selectedColor}
									onClick={() => {
										setIsOpenModal(true);
										setModalType('notification');
										setItemId(value.id);
										setNotificationUser(value.name);
									}}
								>
									알림
								</ShortBtn>
								<ShortBtn
									$selectedColor={selectedColor}
									onClick={() => {
										setIsOpenModal(true);
										setModalType('cancel');
										setItemId(value.id);
									}}
								>
									취소
								</ShortBtn>
								<LongBtn
									onClick={() => {
										setIsOpenModal(true);
										setModalType('seated');
										setItemId(value.id);
									}}
								>
									착석 완료
								</LongBtn>
							</>
						) : (
							<span>{value.status === 'seated' ? '착석 완료' : '취소'}</span>
						)}
					</WatingBtnWrapper>
				</WaitingItemWrapper>
			));
	};

	return <>{showWaitingList()}</>;
};

export default WaitingItem;

const WaitingItemWrapper = styled.tr`
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.darkColor?.background)};
	color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
	border: ${({ theme }) => (theme.lightColor ? 'none' : `1px solid ${theme.textColor.white}`)};
	width: 982px;
	height: 72px;
	border-radius: 10px;
	display: flex;
	align-items: center;
	padding-left: 40px;
	padding-right: 30px;
	margin: 0 auto;
	margin-bottom: 12px;
	font-size: ${({ theme }) => theme.fontSize['2xl']};
	td {
		display: flex;
		justify-content: center;
	}
`;

const WatingBtnWrapper = styled.td<ColorProps>`
	width: 300px;
	height: 48px;
	color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	display: flex;
	justify-content: center;
	align-items: center;

	span {
		color: ${({ theme, $selectedColor }) =>
			theme.lightColor ? theme.lightColor[$selectedColor]?.point : theme.darkColor?.point};
	}
`;

const ShortBtn = styled.button<ColorProps>`
	width: 65px;
	height: 48px;
	margin-right: 14px;
	border-radius: 10px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor?.yellow.sub : theme.darkColor?.main)};
`;

const LongBtn = styled.button`
	width: 113px;
	height: 48px;
	border-radius: 10px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor?.yellow.sub : theme.darkColor?.main)};
`;
