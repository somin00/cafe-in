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
					<ul>
						<li>
							<img src="/assets/user/IceCoffee.svg" alt="제품이미지" width={52} />
							<p>아메리카노</p>
							<p>1</p>
							<p>4,500원</p>
						</li>
						<li>
							<img src="/assets/user/IceCoffee.svg" alt="제품이미지" width={52} />
							<p>아메리카노</p>
							<p>1</p>
							<p>4,500원</p>
						</li>
						<li>
							<img src="/assets/user/IceCoffee.svg" alt="제품이미지" width={52} />
							<p>아메리카노</p>
							<p>1</p>
							<p>4,500원</p>
						</li>
					</ul>
				</OrderList>
				<OrderTotalPriceContainer>
					<div>
						<h2>
							주문금액
							<p>2131223123원</p>
						</h2>
						<h2>
							포인트 사용
							<p>2131223123원</p>
						</h2>
						<h2>
							총 결제 금액
							<p>2131223123원</p>
						</h2>
					</div>

					<div>
						<div>포인트 적립</div>
						<div>포인트 사용</div>
						<div>결제하기</div>
					</div>
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
	background-color: burlywood;
	display: flex;
	h1 {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;
const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;
const OrderList = styled.div`
	background-color: aqua;
	width: 583px;
`;
const TableHead = styled.ul`
	display: flex;
	background-color:;
`;
const BackBTn = styled.button`
	background-color: cornsilk;
`;
const OrderTotalPriceContainer = styled.div`
	background-color: bisque;
	flex-grow: 1;
`;
export default OrderCheck;
