import React from 'react';
import { styled } from 'styled-components';
import WaitingHeader from '../../components/waitingManagement/WaitingHeader';
import WaitingItem from '../../components/waitingManagement/WaitingItem';

interface ThProps {
	width?: string;
}

const WaitingManagement = () => {
	return (
		<WaitingManagementWrapper>
			<WaitingHeader />
			<WaitingTableWrapper>
				<TableMenu>
					<ListWrapper>
						<WaitingList role="button" tabIndex={0} aria-label="대기 중 명단 선택하기">
							<img src={process.env.PUBLIC_URL + '/assets/admin/check-able_light.svg'} alt="선택된 체크 버튼" />
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
									현재 대기 <span>649</span>팀
								</ThCell>
							</TableHeader>
						</thead>
						<WaitingItemList>
							<WaitingItem />
							<WaitingItem />
							<WaitingItem />
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
	background-color: ${({ theme }) => theme.textColor.white};
	user-select: none;
`;

const WaitingTableWrapper = styled.div`
	width: 1046px;
	height: 697px;
	background-color: #fff;
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
	img {
		margin-right: 10px;
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
	background-color: ${({ theme }) => theme.lightColor?.yellow.point};
	color: ${({ theme }) => theme.textColor.white};
	border-radius: 10px;
	margin-right: 8px;
`;

const WaitingDisableBtn = styled.button`
	width: 137px;
	height: 54px;
	border-radius: 10px;
	border: 2px solid ${({ theme }) => theme.lightColor?.yellow.point};
	color: ${({ theme }) => theme.lightColor?.yellow.point};
`;

const TableBox = styled.div`
	width: 1046px;
	height: 625px;
	margin-bottom: 48px;
	padding-top: 20px;
	background-color: ${({ theme }) => theme.lightColor?.yellow.background};
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
	background-color: ${({ theme }) => theme.lightColor?.yellow.main};

	span {
		color: ${({ theme }) => theme.textColor.darkbrown};
	}
`;

const WaitingItemList = styled.tbody`
	width: 982px;
	height: 470px;
	margin: 0 0 32px 32px;
`;
