import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function OrderCheck() {
	const navigate = useNavigate();
	return (
		<Layout>
			<Header>
				<BackBTn onClick={() => navigate('/menu')}>
					<img src="/assets/user/BackBtn.svg" alt="메뉴페이지" />
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
						<OrderMenuItem>
							<div className="products-name">
								<img src="/assets/user/IceCoffee.svg" alt="제품이미지" width={42} />
								<p>아메리카노</p>
							</div>
							<p>1</p>
							<p>4,500원</p>
						</OrderMenuItem>
					</Tbody>
				</OrderList>
				<OrderTotalPriceContainer>
					<TotalPrice>
						<div>
							<h2>주문금액</h2>
							<p>2131223123원</p>
						</div>
						<div>
							<h2>포인트 사용</h2>
							<p>- 2131223123원</p>
						</div>
						<div>
							<h2>총 결제 금액</h2>
							<p>2131223123원</p>
						</div>
					</TotalPrice>

					<Payment>
						<div className="point">
							<button className="add-point">포인트 적립</button>
							<button className="use-point">포인트 사용</button>
						</div>
						<button className="payment">
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
	height: 834px;
`;
const Header = styled.div`
	display: flex;
	border-bottom: 1px solid ${({ theme }) => theme.textColor.lightgray};
	padding: 10px;
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
	align-items: center;
	height: 677px;
	margin: 20px 0;
`;
const TableHead = styled.ul`
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	height: 69px;
	border-radius: 10px;
	background-color: ${({ theme }) => theme.textColor.lightgray};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	font-size: ${({ theme }) => theme.fontSize.xl};
`;
const Tbody = styled.ul`
	background-color: ${({ theme }) => theme.lightColor?.yellow.background};
	border-radius: 10px;
	height: 100%;
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
	background-color: ${({ theme }) => theme.textColor.white};
	margin: 10px 25px;
	padding: 10px;
	border-radius: 10px;
	div,
	p {
		flex: 1;
		text-align: center;
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
	margin: 0 48px;
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
`;
const TotalPrice = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 380px;
	border-bottom: 1px solid ${({ theme }) => theme.textColor.lightgray};
	margin-top: 40px;
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
		background-color: ${({ theme }) => theme.lightColor?.blue.background};
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
		background-color: ${({ theme }) => theme.lightColor?.blue.background};
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
		background-color: ${({ theme }) => theme.lightColor?.blue.background};
		height: 120px;
		border-radius: 10px;
	}
`;
export default OrderCheck;
