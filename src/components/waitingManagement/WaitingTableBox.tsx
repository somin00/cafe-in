import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import WaitingItem from './WaitingItem';
import { WaitingDataType } from '../../types/waitingDataType';

import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

interface ThProps {
	width?: string;
}

type waitingDataProps = {
	waitingDataStatus: string;
};

const WaitingTableBox = (props: waitingDataProps) => {
	const { waitingDataStatus } = props;
	const [waitingList, setWaitingList] = useState<WaitingDataType[]>([]);

	useEffect(() => {
		const waitingCollectionRef = collection(db, 'waitingList');
		const getWaitingList = async () => {
			try {
				const data = await getDocs(waitingCollectionRef);
				setWaitingList(
					data.docs.map((doc) => ({
						id: doc.id,
						...(doc.data() as WaitingDataType),
					})),
				);
			} catch (error) {
				console.error('Error fetching waitingList : ', error);
			}
		};
		getWaitingList();
	}, []);

	//* 당일 날짜의 대기만 출력
	const today = new Date();
	today.setHours(0, 0, 0, 0); // 시간, 분, 초, 밀리초를 0으로 설정하여 날짜만 비교하도록 함
	const todayWaiting = waitingList.filter(
		(value) =>
			new Date(value.date).getDate() === today.getDate() &&
			new Date(value.date).getMonth() === today.getMonth() &&
			new Date(value.date).getFullYear() === today.getFullYear(),
	);

	let waitingInfo: WaitingDataType[] = [];

	if (waitingDataStatus === 'waiting') {
		waitingInfo = todayWaiting.filter((value) => value.status === 'waiting');
	} else if (waitingDataStatus === 'waited') {
		waitingInfo = todayWaiting.filter((value) => value.status === 'seated' || value.status === 'cancel');
	}

	const todayWaitingNum = waitingInfo.length;

	return (
		<TableBox>
			<table>
				<thead>
					<TableHeader>
						<ThCell width="140px">대기 번호</ThCell>
						<ThCell width="110px">이름</ThCell>
						<ThCell width="125px">인원</ThCell>
						<ThCell width="250px">전화번호</ThCell>
						<ThCell width="300px">
							{waitingDataStatus === 'waiting' ? (
								<span>
									현재 대기 <span className="totalNum">{todayWaitingNum}</span>팀
								</span>
							) : (
								<span>
									전체 대기 팀 <span className="totalNum">{todayWaitingNum}</span>팀
								</span>
							)}
						</ThCell>
					</TableHeader>
				</thead>
				<WaitingItemList>
					<WaitingItem waitingInfo={waitingInfo} waitingDataStatus={waitingDataStatus} />
				</WaitingItemList>
			</table>
		</TableBox>
	);
};

export default WaitingTableBox;

const TableBox = styled.div`
	width: 1046px;
	height: 625px;
	margin-bottom: 48px;
	padding-top: 20px;
	background-color: ${({ theme }) =>
		theme.lightColor ? theme.lightColor?.yellow.background : theme.darkColor?.background};
	border: ${({ theme }) => (theme.lightColor ? 'none' : `1px solid ${theme.textColor.white}`)};
`;

// eslint-disable-next-line prettier/prettier
const ThCell = styled.th<ThProps>`
	width: ${({ width }) => width};
`;

const TableHeader = styled.tr`
	width: 982px;
	height: 68px;
	font-size: ${({ theme }) => theme.fontSize['2xl']};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	border-radius: 15px;
	display: flex;
	align-items: center;
	margin: 0 32px 15px 32px;
	padding-left: 32px;
	padding-right: 40px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor.yellow.main : theme.textColor.white)};
	border: ${({ theme }) => (theme.lightColor ? 'none' : '1px solid white')};

	span > .totalNum {
		color: ${({ theme }) => (theme.lightColor ? theme.textColor.darkbrown : theme.darkColor?.sub)};
	}
`;

const WaitingItemList = styled.tbody`
	width: 982px;
	height: 470px;
	margin: 0 0 32px 32px;
`;
