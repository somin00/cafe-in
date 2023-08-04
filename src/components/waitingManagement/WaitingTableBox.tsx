import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import WaitingItem from './WaitingItem';
import { WaitingDataType } from '../../types/waitingDataType';
import { db } from '../../firebase/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { filterTodayWaiting } from '../../utils/filter';
import { useRecoilValue } from 'recoil';
import { isWaitingAvailableState } from '../../state/WaitingState';

interface ThProps {
	width?: string;
}

type waitingDataProps = {
	waitingDataStatus: string;
};

const WaitingTableBox = (props: waitingDataProps) => {
	const { waitingDataStatus } = props;
	const [waitingList, setWaitingList] = useState<WaitingDataType[]>([]);
	const isWaitingAvailable = useRecoilValue<boolean>(isWaitingAvailableState);

	useEffect(() => {
		const waitingCollectionRef = collection(db, 'waitingList');
		const getWaitingList = onSnapshot(waitingCollectionRef, (snapshot) => {
			const data: WaitingDataType[] = [];
			snapshot.forEach((doc) => {
				data.push({
					id: doc.id,
					...(doc.data() as WaitingDataType),
				});
			});
			setWaitingList(data);
		});
		return () => getWaitingList();
	}, []);

	//* 당일 날짜 + 선택한 status(waitingDataStatus)에 따라 해당 status의 data만 저장해서 리턴하는 함수

	const waitingInfo = filterTodayWaiting(waitingList, waitingDataStatus);

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
					{!isWaitingAvailable ? (
						<TableMesesage>
							<td>대기가 마감되었습니다.</td>
						</TableMesesage>
					) : (
						<></>
					)}
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
	overflow-y: scroll;
	overflow-x: hidden;
	-ms-overflow-style: none;
	scrollbar-width: none;

	&::-webkit-scrollbar {
		display: none;
	}
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

const TableMesesage = styled.tr`
	width: 982px;
	height: 72px;
	font-size: ${({ theme }) => theme.fontSize['2xl']};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	display: flex;
	justify-content: center;
	align-items: center;
	td {
		padding-left: 40px;
		color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
	}
`;
