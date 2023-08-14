import React from 'react';
import withAuth from '../../components/adminMode/WithAuth';
import { styled } from 'styled-components';
import ManagementHeader from '../../components/adminMode/ManagementHeader';

function SalesList() {
	return (
		<SalesListWrapper>
			<ManagementHeader headerText="매출 내역 조회" />
			<SalesContent>
				<DailySalesWrapper>
					<p>
						<button>{'<'}</button> 08/13 매출 <button>{'>'}</button>
					</p>
					<SalesBoxWrapper>
						<SalesBox className="totalOrder">
							<p>주문 건 수</p>
							<p>123건</p>
						</SalesBox>
						<SalesBox>
							<p>총 매출 액</p> <p> 12,345원</p>
						</SalesBox>
					</SalesBoxWrapper>
				</DailySalesWrapper>
				<MonthlySalesWrapper>
					<p>
						<button>{'<'}</button> 8월 매출 <button>{'>'}</button>
					</p>
					<SalesBoxWrapper>
						<SalesBox>
							<p>8월 매출</p> <p>12,345원</p>
						</SalesBox>
					</SalesBoxWrapper>
				</MonthlySalesWrapper>
			</SalesContent>
		</SalesListWrapper>
	);
}

export default withAuth(SalesList);

const SalesListWrapper = styled.div`
	width: 1194px;
	height: 834px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.darkColor?.background)};
	user-select: none;
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
`;

const SalesContent = styled.div`
	height: 754px;
	width: 934px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 100px;
	p {
		font-size: ${({ theme }) => theme.fontSize['4xl']};
		color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
		margin-bottom: 30px;
		display: flex;
		justify-content: space-between;
	}
`;

const SalesBoxWrapper = styled.div`
	background-color: lavender;
	height: 239px;
	display: flex;
	justify-content: center;
	align-items: center;

	.totalOrder {
		margin-right: 46px;
	}
`;

const SalesBox = styled.div`
	width: 194px;
	height: 194px;
	background-color: white;
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: center;
	line-height: 50px;
	font-size: ${({ theme }) => theme.fontSize['3xl']};
	color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
`;

const DailySalesWrapper = styled.div`
	width: 486px;
	height: 288px;
	text-align: center;
`;

const MonthlySalesWrapper = styled.div`
	width: 260px;
	height: 288px;
	text-align: center;
`;
