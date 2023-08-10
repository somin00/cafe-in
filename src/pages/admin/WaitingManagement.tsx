import { useEffect, useState } from 'react';
import { styled, useTheme } from 'styled-components';
import { Routes, Route, NavLink } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import ManagementHeader from '../../components/adminMode/ManagementHeader';
import WaitingTableBox from '../../components/waitingManagement/WaitingTableBox';
import WaitingModal from '../../components/waitingManagement/WaitingModal';
import { isWaitingAvailableState } from '../../state/WaitingState';
import { modalState } from '../../state/ModalState';
import { selectedColorState } from '../../state/ColorState';
import { useSelectedColor } from '../../hooks/useSelectedColor';
import { SelectedColorType } from '../../style/theme';

type DataStatusProps = {
	$isWaiting: boolean;
};

type styleProps = {
	$isWaitingAvailable: boolean;
	$selectedColor: SelectedColorType;
};

const WaitingManagement = () => {
	const selectedColor = useRecoilValue<SelectedColorType>(selectedColorState);
	const [isOpenModal, setIsOpenModal] = useRecoilState<boolean>(modalState);
	const theme = useTheme();
	const [isWaiting, setIsWaiting] = useState<boolean>(true);
	const [isWaitingAvailable, setIsWaitingAvailable] = useRecoilState<boolean>(isWaitingAvailableState);

	useSelectedColor();

	const closeModal = () => {
		setIsOpenModal(false);
	};

	useEffect(() => {
		const storedIsWaiting = localStorage.getItem('isWaiting');

		if (storedIsWaiting != null) {
			setIsWaiting(JSON.parse(storedIsWaiting));
		}

		localStorage.setItem('isWaitingAvailable', isWaitingAvailable.toString());
	}, [isWaiting, isWaitingAvailable, setIsWaiting]);

	const handleIsWaitingChange = (newIsWaiting: boolean) => {
		setIsWaiting(newIsWaiting);
		localStorage.setItem('isWaiting', JSON.stringify(newIsWaiting));
	};

	return (
		<WaitingManagementWrapper>
			{isOpenModal && <WaitingModal closeModal={closeModal} />}
			<ManagementHeader headerText="대기 관리" />
			<WaitingTableWrapper>
				<TableMenu>
					<ListWrapper>
						<WaitingList
							to="/admin/waiting"
							role="button"
							tabIndex={0}
							aria-label="대기 중 명단 선택하기"
							$isWaiting={isWaiting}
							onClick={() => {
								handleIsWaitingChange(true);
							}}
						>
							<img
								alt="대기 중 명단 선택 상태 안내"
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
							$isWaiting={isWaiting}
							onClick={() => {
								handleIsWaitingChange(false);
							}}
						>
							<img
								src={
									isWaiting
										? process.env.PUBLIC_URL + '/assets/admin/check-disable_light.svg'
										: process.env.PUBLIC_URL +
										  (theme.lightColor ? '/assets/admin/check-able_light.svg' : '/assets/admin/check-able_dark.svg')
								}
								alt="대기 완료 명단 선택 상태 안내"
							/>
							대기 완료 명단
						</WaitedList>
					</ListWrapper>
					<WaitingBtnWrapper>
						<WaitingAbleBtn
							$isWaitingAvailable={isWaitingAvailable}
							$selectedColor={selectedColor}
							onClick={() => setIsWaitingAvailable(true)}
						>
							대기 가능
						</WaitingAbleBtn>
						<WaitingDisableBtn
							$isWaitingAvailable={isWaitingAvailable}
							$selectedColor={selectedColor}
							onClick={() => setIsWaitingAvailable(false)}
						>
							대기 마감
						</WaitingDisableBtn>
					</WaitingBtnWrapper>
				</TableMenu>
				<Routes>
					<Route path="/*" element={<WaitingTable />}></Route>
					<Route path="/waitedlist" element={<TodayWaitedTable />}></Route>
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
	position: relative;
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

const WaitingList = styled(NavLink)<DataStatusProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${({ theme, $isWaiting }) =>
		$isWaiting ? (theme.lightColor ? theme.textColor.black : theme.textColor.white) : theme.textColor.darkgray};

	img {
		margin-right: 10px;
	}
`;

const WaitedList = styled(NavLink)<DataStatusProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${({ theme, $isWaiting }) =>
		$isWaiting ? theme.textColor.darkgray : theme.lightColor ? theme.textColor.black : theme.textColor.white};
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

const WaitingAbleBtn = styled.button<styleProps>`
	width: 137px;
	height: 54px;
	background-color: ${({ theme, $isWaitingAvailable, $selectedColor }) =>
		$isWaitingAvailable
			? theme.lightColor
				? theme.lightColor[$selectedColor]?.point
				: theme.textColor.darkgray
			: 'none'};
	color: ${({ theme, $isWaitingAvailable, $selectedColor }) =>
		$isWaitingAvailable
			? theme.textColor.white
			: theme.lightColor
			? theme.lightColor[$selectedColor]?.point
			: theme.textColor.darkgray};
	border: ${({ theme, $isWaitingAvailable, $selectedColor }) =>
		$isWaitingAvailable
			? 'none'
			: theme.lightColor
			? `2px solid ${theme.lightColor[$selectedColor]?.point}`
			: `2px solid ${theme.textColor.darkgray}`};
	border-radius: 10px;
	margin-right: 8px;
`;

const WaitingDisableBtn = styled.button<styleProps>`
	width: 137px;
	height: 54px;
	border-radius: 10px;
	background-color: ${({ theme, $isWaitingAvailable, $selectedColor }) =>
		$isWaitingAvailable
			? 'none'
			: theme.lightColor
			? theme.lightColor[$selectedColor]?.point
			: theme.textColor.darkgray};
	border: ${({ theme, $selectedColor }) =>
		theme.lightColor
			? `2px solid ${theme.lightColor[$selectedColor]?.point}`
			: `2px solid ${theme.textColor.darkgray}`};
	color: ${({ theme, $isWaitingAvailable, $selectedColor }) =>
		$isWaitingAvailable
			? theme.lightColor
				? theme.lightColor[$selectedColor].point
				: theme.textColor.darkgray
			: theme.textColor.white};
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
