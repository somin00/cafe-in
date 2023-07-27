import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import WaitingHeader from '../../components/waitingManagement/WaitingHeader';
import WaitingItem from '../../components/waitingManagement/WaitingItem';
import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

interface ThProps {
	width?: string;
}

type WaitingListData = {
	id?: string;
	name: string;
	tel: string;
	status: string;
	date: number;
	personNum: number;
	no: number;
};

const WaitingManagement = () => {
	const [waitingList, setWaitingList] = useState<WaitingListData[]>([]);

	useEffect(() => {
		const waitingCollectionRef = collection(db, 'waitingList');
		const getWaitingList = async () => {
			try {
				const data = await getDocs(waitingCollectionRef);
				setWaitingList(
					data.docs.map((doc) => ({
						id: doc.id,
						...(doc.data() as WaitingListData),
					})),
				);
			} catch (error) {
				console.error('Error fetching waitingList : ', error);
			}
		};
		getWaitingList();
	}, []);

	const waitingInfo = waitingList.filter((value) => value.status === 'waiting');
	const waitingNum = waitingInfo.length;

	return (
		<WaitingManagementWrapper>
			<WaitingHeader />
			<WaitingTableWrapper>
				<TableMenu>
					<ListWrapper>
						<WaitingList role="button" tabIndex={0} aria-label="대기 중 명단 선택하기">
							<img alt="선택된 체크 버튼" />
							대기 중 명단
						</WaitingList>
						<WaitedList role="button" tabIndex={0} aria-label="대기 완료 명단 선택하기">
							<img
								src={process.env.PUBLIC_URL + '/assets/admin/check-disable_light.svg'}
								alt="선택되지 않은 체크 버튼"
							/>
							대기 완료 명단
						</WaitedList>
					</ListWrapper>
					<WaitingBtnWrapper>
						<WaitingAbleBtn>대기 가능</WaitingAbleBtn>
						<WaitingDisableBtn>대기 마감</WaitingDisableBtn>
					</WaitingBtnWrapper>
				</TableMenu>
				<TableBox>
					<table>
						<thead>
							<TableHeader>
								<ThCell width="140px">대기 번호</ThCell>
								<ThCell width="110px">이름</ThCell>
								<ThCell width="125px">인원</ThCell>
								<ThCell width="250px">전화번호</ThCell>
								<ThCell width="300px">
									현재 대기 <span>{waitingNum}</span>팀
								</ThCell>
							</TableHeader>
						</thead>
						<WaitingItemList>
							<WaitingItem waitingList={waitingList} />
						</WaitingItemList>
					</table>
				</TableBox>
			</WaitingTableWrapper>
		</WaitingManagementWrapper>
	);
};

export default WaitingManagement;

const WaitingManagementWrapper = styled.div`
	width: 1194px;
	height: 834px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.darkColor?.background)};
	user-select: none;
`;

const WaitingTableWrapper = styled.div`
	width: 1046px;
	height: 697px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.darkColor?.background)};
	margin-left: 74px;
	margin-right: 74px;
	margin-top: 9px;
	margin-bottom: 48px;
`;

const TableMenu = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 1046px;
	height: 72px;
`;

const ListWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	width: 352px;
	font-size: ${({ theme }) => theme.fontSize['2xl']};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	height: 32px;
`;

const WaitingList = styled.p`
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
	img {
		margin-right: 10px;
		content: ${({ theme }) =>
			theme.lightColor ? 'url(/assets/admin/check-able_light.svg)' : ' url(/assets/admin/check-able_dark.svg)'};
	}
`;

const WaitedList = styled.p`
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${({ theme }) => theme.textColor.darkgray};
	img {
		margin-right: 10px;
	}
`;

const WaitingBtnWrapper = styled.div`
	width: 284px;
	height: 64px;
	font-size: ${({ theme }) => theme.fontSize['2xl']};
	font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const WaitingAbleBtn = styled.button`
	width: 137px;
	height: 54px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor?.yellow.point : theme.textColor.darkgray)};
	color: ${({ theme }) => theme.textColor.white};
	border-radius: 10px;
	margin-right: 8px;
`;

const WaitingDisableBtn = styled.button`
	width: 137px;
	height: 54px;
	border-radius: 10px;
	border: ${({ theme }) =>
		theme.lightColor ? `2px solid ${theme.lightColor?.yellow.point}` : `2px solid ${theme.textColor.darkgray}`};
	color: ${({ theme }) => (theme.lightColor ? theme.lightColor?.yellow.point : theme.textColor.darkgray)};
`;

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
	span {
		color: ${({ theme }) => (theme.lightColor ? theme.textColor.darkbrown : theme.darkColor?.sub)};
	}
`;

const WaitingItemList = styled.tbody`
	width: 982px;
	height: 470px;
	margin: 0 0 32px 32px;
`;
