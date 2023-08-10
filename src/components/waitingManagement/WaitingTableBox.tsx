import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { db } from '../../firebase/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { useRecoilValue } from 'recoil';
import WaitingItem from './WaitingItem';
import { SelectedColorType } from '../../style/theme';
import { WaitingDataType } from '../../types/waitingDataType';
import { ColorProps } from '../../types/ColorProps';
import { filterTodayWaiting } from '../../utils/filter';
import { useSelectedColor } from '../../hooks/useSelectedColor';
import { isWaitingAvailableState } from '../../state/WaitingState';
import { selectedColorState } from '../../state/ColorState';

interface ThProps {
	width?: string;
}

type waitingDataProps = {
	waitingDataStatus: string;
};

const WaitingTableBox = (props: waitingDataProps) => {
	const selectedColor = useRecoilValue<SelectedColorType>(selectedColorState);
	useSelectedColor();
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

	const waitingInfo = filterTodayWaiting(waitingList, waitingDataStatus);
	const todayWaitingNum = waitingInfo.length;

	return (
		<TableBox $selectedColor={selectedColor}>
			<table>
				<thead>
					<TableHeader $selectedColor={selectedColor}>
						<ThCell width="140px">대기 번호</ThCell>
						<ThCell width="110px">이름</ThCell>
						<ThCell width="125px">인원</ThCell>
						<ThCell width="250px">전화번호</ThCell>
						<ThCell width="300px">
							{waitingDataStatus === 'waiting' ? (
								<span>현재 대기 {todayWaitingNum}팀</span>
							) : (
								<span>전체 대기 팀 {todayWaitingNum}팀</span>
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

const TableBox = styled.div<ColorProps>`
	width: 1046px;
	height: 625px;
	margin-bottom: 48px;
	padding-top: 20px;
	background-color: ${({ theme, $selectedColor }) =>
		theme.lightColor ? theme.lightColor[$selectedColor].background : theme.darkColor?.background};
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

const TableHeader = styled.tr<ColorProps>`
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
	background-color: ${({ theme, $selectedColor }) =>
		theme.lightColor ? theme.lightColor[$selectedColor].main : theme.textColor.white};
	border: ${({ theme }) => (theme.lightColor ? 'none' : '1px solid white')};
	color: ${({ theme, $selectedColor }) =>
		theme.lightColor
			? $selectedColor === 'blue'
				? theme.textColor.white
				: theme.textColor.black
			: theme.textColor.black};
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
