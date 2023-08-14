import { useEffect, useState } from 'react';
import withAuth from '../../components/adminMode/WithAuth';
import { styled } from 'styled-components';
import ManagementHeader from '../../components/adminMode/ManagementHeader';
import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

interface Order {
	id: number;
	list: {
		menu: string;
		quantity: number;
		options: string;
		isComplete: boolean;
	}[];
	totalPrice: number;
	takeout: boolean;
	progress: '진행중' | '완료주문';
}

interface DaySalesData {
	date: string;
	totalPriceSum: number;
	orderCount: number;
}

function SalesList() {
	const currentDate = new Date();
	const timezoneOffset = currentDate.getTimezoneOffset(); // 현재 시간대의 UTC 차이 (분 단위)
	const koreanOffset = 9 * 60; // 한국 시간대의 UTC 차이 (분 단위)
	const koreanTime = currentDate.getTime() + (koreanOffset - timezoneOffset) * 60 * 1000; // 보정된 시간 (밀리초 단위)
	const KoreanDate = new Date(koreanTime);

	const todayDate = KoreanDate.toISOString().split('T')[0];
	const [salesList, setSalesList] = useState<Order[]>([]);
	const [daySalesData, setDaySalesData] = useState<DaySalesData[]>([]);
	const [displayDate, setDisplayDate] = useState(todayDate);
	const [targetYear, setTargetYear] = useState(KoreanDate.getFullYear());
	const [targetMonth, setTargetMonth] = useState(KoreanDate.getMonth() + 1);

	const handleMonthChange = (nextMonth: boolean) => {
		let newTargetYear = targetYear;
		let newTargetMonth = targetMonth;

		if (nextMonth) {
			newTargetMonth += 1;
			if (newTargetMonth > 12) {
				newTargetMonth = 1;
				newTargetYear += 1;
			}
		} else {
			newTargetMonth -= 1;
			if (newTargetMonth < 1) {
				newTargetMonth = 12;
				newTargetYear -= 1;
			}
		}

		setTargetYear(newTargetYear);
		setTargetMonth(newTargetMonth);
	};

	const handlePreviousDay = () => {
		const currentDate = new Date(displayDate);
		currentDate.setDate(currentDate.getDate() - 1);
		const previousDate = currentDate.toISOString().split('T')[0];
		setDisplayDate(previousDate);
	};

	const handleNextDay = () => {
		const currentDate = new Date(displayDate);
		currentDate.setDate(currentDate.getDate() + 1);
		const nextDate = currentDate.toISOString().split('T')[0];
		setDisplayDate(nextDate);
	};

	useEffect(() => {
		const getSales = async () => {
			const orderListCollection = collection(db, 'testOrderList');
			const salesDocs = await getDocs(orderListCollection);
			const salesDataList: Order[] = [];
			salesDocs.forEach((doc) => {
				salesDataList.push({ ...(doc.data() as Order) });
			});
			setSalesList(salesDataList);
		};

		getSales();
	}, []);

	// 같은 날짜 별로 데이터 그룹화하기
	useEffect(() => {
		const salesByDate: { [date: string]: { salesData: Order[]; totalPriceSum: number } } = {};

		salesList.forEach((order) => {
			const date = new Date(order.id).toISOString().split('T')[0];

			if (!salesByDate[date]) {
				salesByDate[date] = { salesData: [], totalPriceSum: 0 };
			}

			salesByDate[date].salesData.push(order);
			salesByDate[date].totalPriceSum += order.totalPrice;
		});

		const daySalesList: DaySalesData[] = [];

		for (const date in salesByDate) {
			const { salesData, totalPriceSum } = salesByDate[date];
			daySalesList.push({ date, totalPriceSum, orderCount: salesData.length });
		}

		setDaySalesData(daySalesList);
	}, [salesList]);

	//일 별 데이터 가져오기
	const dayData = daySalesData.filter((v) => v.date === displayDate);

	const filterData = daySalesData.filter((data) => {
		const stringDate = data.date.split('-');
		const year = parseInt(stringDate[0]);
		const month = parseInt(stringDate[1]);

		return year === targetYear && month === targetMonth;
	});

	return (
		<SalesListWrapper>
			<ManagementHeader headerText="매출 내역 조회" />
			<SalesContent>
				<DailySalesWrapper>
					<p>
						<button aria-label="전 날 매출 보기" onClick={handlePreviousDay}>
							{'<'}
						</button>
						{dayData.length > 0 ? <span> {dayData[0].date} </span> : <span>{displayDate} </span>}
						<button aria-label="다음 날 매출 보기" onClick={handleNextDay}>
							{'>'}
						</button>
					</p>
					<SalesBoxWrapper>
						<SalesBox className="totalOrder">
							<p>주문 건 수</p>
							{dayData.length > 0 ? <p> {dayData[0].orderCount}건</p> : <p>0 건</p>}
						</SalesBox>
						<SalesBox>
							<p>총 매출 액</p>
							{dayData.length > 0 ? <p> {dayData[0].totalPriceSum}원</p> : <p>0원</p>}
						</SalesBox>
					</SalesBoxWrapper>
				</DailySalesWrapper>
				<MonthlySalesWrapper>
					<p>
						<button aria-label="지난 달 매출 보기" onClick={() => handleMonthChange(false)}>
							{'<'}
						</button>
						{targetMonth}월 매출
						<button aria-label="다음 달 매출 보기" onClick={() => handleMonthChange(true)}>
							{'>'}
						</button>
					</p>
					<SalesBoxWrapper>
						<SalesBox>
							<p>{targetMonth}월 매출</p>{' '}
							{filterData.length > 0 ? (
								<p> {filterData.reduce((sum, data) => sum + data.totalPriceSum, 0)}원</p>
							) : (
								<p>0 원</p>
							)}
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
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor.background : theme.darkColor.background)};
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
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.darkColor.main)};
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
