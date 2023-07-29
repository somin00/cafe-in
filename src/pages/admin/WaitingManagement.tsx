import React, { useState } from 'react';
import { styled, useTheme } from 'styled-components';
import { Routes, Route, NavLink } from 'react-router-dom';
import WaitingHeader from '../../components/waitingManagement/WaitingHeader';
import WaitingTableBox from '../../components/waitingManagement/WaitingTableBox';

const WaitingManagement = () => {
	const [isWaiting, setisWaiting] = useState<boolean>(true);

	const theme = useTheme();

	return (
		<WaitingManagementWrapper>
			<WaitingHeader />
			<WaitingTableWrapper>
				<TableMenu>
					<ListWrapper>
						<WaitingList
							to="/admin/waiting"
							role="button"
							tabIndex={0}
							aria-label="대기 중 명단 선택하기"
							onClick={() => {
								setisWaiting(true);
							}}
						>
							<img
								alt="선택된 체크 버튼"
								src={
									isWaiting
										? process.env.PUBLIC_URL +
										  (theme.lightColor ? '/assets/admin/check-able_light.svg' : '/assets/admin/check-able_dark.svg')
										: process.env.PUBLIC_URL + '/assets/admin/check-disable_light.svg'
								}
							/>
							대기 중 명단
						</WaitingList>
						<WaitedList
							to="/admin/waiting/waitedlist"
							role="button"
							tabIndex={0}
							aria-label="대기 완료 명단 선택하기"
							onClick={() => {
								setisWaiting(false);
							}}
						>
							<img
								src={
									isWaiting
										? process.env.PUBLIC_URL + '/assets/admin/check-disable_light.svg'
										: process.env.PUBLIC_URL +
										  (theme.lightColor ? '/assets/admin/check-able_light.svg' : '/assets/admin/check-able_dark.svg')
								}
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
				<Routes>
					<Route path="/waitedlist" element={<TodayWaitedTable />}></Route>
					<Route path="/*" element={<WaitingTable />}></Route>
				</Routes>
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

const WaitingList = styled(NavLink)`
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
	img {
		margin-right: 10px;
	}
`;

const WaitedList = styled(NavLink)`
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
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

// ---------------------------

function TodayWaitedTable() {
	const waitingDataStatus = 'waited';
	return (
		<div>
			<WaitingTableBox waitingDataStatus={waitingDataStatus} />
		</div>
	);
}

function WaitingTable() {
	const waitingDataStatus = 'waiting';
	return <WaitingTableBox waitingDataStatus={waitingDataStatus} />;
}
