import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import AddPointModal from '../../components/UserMode/AddPointModal';
import UsePointUser from '../../components/UserMode/UsePointUser';
import { darkTheme, defaultTheme } from '../../style/theme';
import { collection, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useRecoilValue } from 'recoil';
import { usedPointsState } from '../../state/PointState';
interface Order {
	id: string;
	list: {
		menu: string;
		quantity: number;
		options: string;
		isComplete: boolean;
	}[];
	totalPrice: number;
	takeout: boolean;
}
function OrderCheck() {
	const navigate = useNavigate();
	const theme = useTheme();
	const usedPoints = useRecoilValue(usedPointsState);
	const [isOpenAddPointModal, setAddPointModalOpen] = useState<boolean>(false);
	const [isOpenUsePointUserModal, setUsePointUserModalOpen] = useState<boolean>(false);
	const [orderList, setOrderList] = useState<Order[]>([]);

	const onClickToggleAddPointModal = useCallback(() => {
		setAddPointModalOpen(!isOpenAddPointModal);
	}, [isOpenAddPointModal]);
	const onClickToggleUsePointUserModal = useCallback(() => {
		setUsePointUserModalOpen(!isOpenUsePointUserModal);
	}, [isOpenUsePointUserModal]);
	useEffect(() => {
		const getOrderList = async () => {
			const orderListCol = collection(db, 'orderList');
			const orderListSnapshot = await getDocs(orderListCol);
			const orderListData: Order[] = orderListSnapshot.docs.map((doc) => {
				const data = doc.data();
				return {
					id: doc.id,
					list: data.list,
					totalPrice: data.totalPrice,
					takeout: data.takeout,
				};
			});
			setOrderList(orderListData);
		};
		getOrderList();
	}, []);

	const totalOrderAmount = orderList.reduce((acc, order) => acc + order.totalPrice, 0);
	const handleDeleteAll = async () => {
		const selectedItemsCol = collection(db, 'orderList');
		const snapshot = await getDocs(selectedItemsCol);

		const batch = writeBatch(db);

		snapshot.docs.forEach((doc) => {
			batch.delete(doc.ref);
		});

		await batch.commit();

		setOrderList([]);
	};
	const TotalOrderPrice = totalOrderAmount - (usedPoints || 0);
	return (
		<Layout>
			<Header>
				<BackBTn
					onClick={() => {
						handleDeleteAll();
						navigate('/menu');
					}}
				>
					<img
						className="backBtn"
						src={theme === defaultTheme ? '/assets/user/BackBtn_light.svg' : '/assets/user/BackBtn_dark.svg'}
						alt="메뉴페이지"
					/>
				</BackBTn>
				<h1>주문 내역 확인</h1>
			</Header>
			<Container>
				<OrderList>
					<TableHead>
						<li>상품명 </li>
						<li>수량 </li>
						<li>주문금액 </li>
					</TableHead>
					<Tbody>
						{orderList.map((order) => (
							<div key={order.id}>
								{order.list.map((item, index) => (
									<OrderMenuItem key={index}>
										<div className="products-name">
											<img src="/assets/user/IceCoffee.svg" alt="제품이미지" width={42} />
											<p>{item.menu}</p>
										</div>
										<p>{item.quantity}</p>
										<p>{order.totalPrice.toLocaleString()}원</p>
									</OrderMenuItem>
								))}
							</div>
						))}
					</Tbody>
				</OrderList>
				<OrderTotalPriceContainer>
					<TotalPrice>
						<div>
							<h2>주문금액</h2>
							<p>{totalOrderAmount.toLocaleString()}원</p>
						</div>
						<div>
							<h2>포인트 사용</h2>
							<p>- {usedPoints?.toLocaleString() ?? '0'}원</p>
						</div>
						<div>
							<h2>총 결제 금액</h2>
							<p>{TotalOrderPrice.toLocaleString()}원</p>
						</div>
					</TotalPrice>

					<Payment>
						<div className="point">
							<button className="add-point" onClick={onClickToggleAddPointModal}>
								포인트 적립
							</button>
							<button className="use-point" onClick={onClickToggleUsePointUserModal}>
								포인트 사용
							</button>
							{isOpenAddPointModal && <AddPointModal onClickToggleModal={onClickToggleAddPointModal} />}
							{isOpenUsePointUserModal && <UsePointUser onClickToggleModal={onClickToggleUsePointUserModal} />}
						</div>
						<button className="payment" onClick={() => handleDeleteAll()}>
							결제하기
							<img src="/assets/user/buy.svg" />
						</button>
					</Payment>
				</OrderTotalPriceContainer>
			</Container>
		</Layout>
	);
}
const Layout = styled.div`
	width: 1194px;
	height: 100%;
	position: relative;
	background-color: ${({ theme }) => (theme === defaultTheme ? theme.textColor.white : darkTheme.darkColor.background)};
	overflow-y: hidden;
`;
const Header = styled.div`
	display: flex;
	border-bottom: 1px solid ${({ theme }) => theme.textColor.lightgray};
	padding: 10px;
	color: ${({ theme }) => (theme === defaultTheme ? theme.textColor.black : darkTheme.textColor.white)};

	h1 {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: ${({ theme }) => theme.fontSize['3xl']};
	}
`;
const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;
	height: 100%;
	padding: 20px 0;
	margin: 0 20px;
`;
const TableHead = styled.ul`
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	height: 69px;
	border-radius: 10px;
	background-color: ${({ theme }) =>
		theme === defaultTheme ? theme.textColor.lightgray : darkTheme.textColor.lightbrown};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	font-size: ${({ theme }) => theme.fontSize.xl};
`;
const Tbody = styled.ul`
	background-color: ${({ theme }) => (theme === defaultTheme ? theme.lightColor?.yellow.background : 'none')};
	border: ${({ theme }) => (theme === darkTheme ? 'none' : `1px solid ${darkTheme.textColor.white}`)};
	border-radius: 10px;
	height: 650px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	margin-top: 10px;
	padding-top: 20px;
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
	/* Firefox */
	scrollbar-width: none;
`;
const OrderMenuItem = styled.li`
	display: flex;
	align-items: center;
	background-color: ${({ theme }) => (theme === defaultTheme ? theme.textColor.white : darkTheme.textColor.lightbrown)};
	margin: 10px 25px;
	padding: 10px;
	border-radius: 10px;
	div,
	p {
		display: flex;
		justify-content: center;
		flex: 1;
		align-items: center;
	}

	.products-name {
		display: flex;
		align-items: center;
		img {
			margin-right: 5px;
			border-radius: 5px;
		}
	}
`;
const OrderList = styled.div`
	width: 583px;
	height: 100%;
	margin: 0 40px;
`;
const BackBTn = styled.button`
	:active {
		background-color: ${({ theme }) => theme.textColor.lightgray};
		border-radius: 10px;
	}
`;
const OrderTotalPriceContainer = styled.div`
	flex-grow: 1;
	height: 100%;
	color: ${({ theme }) => (theme === defaultTheme ? theme.textColor.black : darkTheme.textColor.white)};
`;
const TotalPrice = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 380px;
	border-bottom: 1px solid ${({ theme }) => theme.textColor.lightgray};
	margin-top: 10px;
	padding-bottom: 100px;
	div {
		display: flex;
		justify-content: space-between;
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
		font-size: ${({ theme }) => theme.fontSize['4xl']};
	}
`;
const Payment = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 50px;
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	font-size: ${({ theme }) => theme.fontSize['xl']};
	.add-point {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 230px;
		background-color: ${({ theme }) =>
			theme === defaultTheme ? theme.lightColor?.blue.background : darkTheme.darkColor?.sub};
		height: 120px;
		border-radius: 10px;
		margin-bottom: 40px;
	}
	.payment {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 230px;
		background-color: ${({ theme }) =>
			theme === defaultTheme ? theme.lightColor?.blue.background : darkTheme.darkColor?.sub};
		border-radius: 10px;

		img {
			position: absolute;
			bottom: 0;
		}
	}
	.use-point {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 230px;
		background-color: ${({ theme }) =>
			theme === defaultTheme ? theme.lightColor?.blue.background : darkTheme.darkColor?.sub};
		height: 120px;
		border-radius: 10px;
	}
`;
export default OrderCheck;
