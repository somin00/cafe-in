import React from 'react';
import { styled } from 'styled-components';

function SeletedItemContainer() {
	return (
		<Background>
			<Layout>
				<MenuSeletedContainer>
					<SeletedItem>
						<p>아메리카노</p>
						<div className="counter">
							<button className="minus">-</button>
							<p>x1</p>
							<button className="plus">+</button>
						</div>
						<div className="price">
							<p>4,500원</p>
							<button className="delete">x</button>
						</div>
					</SeletedItem>
					<SeletedItem>
						<p>아메리카노</p>
						<div className="counter">
							<button className="minus">-</button>
							<p>x1</p>
							<button className="plus">+</button>
						</div>
						<div className="price">
							<p>4,500원</p>
							<button className="delete">x</button>
						</div>
					</SeletedItem>
					<SeletedItem>
						<p>아메리카노</p>
						<div className="counter">
							<button className="minus">-</button>
							<p>x1</p>
							<button className="plus">+</button>
						</div>
						<div className="price">
							<p>4,500원</p>
							<button className="delete">x</button>
						</div>
					</SeletedItem>
				</MenuSeletedContainer>
				<PayContainer>
					<TotalPrice>
						<p>총 결제 금액</p>
						<p className="total-price">14,500원</p>
					</TotalPrice>
					<AllDeleteBtn>
						<img src="/assets/user/AllDeleteBtn.svg" alt="전체삭제" />
						<p>전체삭제</p>
					</AllDeleteBtn>
					<OrderBtn>
						<p>주문하기</p>
					</OrderBtn>
				</PayContainer>
			</Layout>
		</Background>
	);
}
const Background = styled.div`
	background-color: ${({ theme }) => theme.textColor.white};
	padding: 10px;
`;
const Layout = styled.div`
	width: 381px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;
const MenuSeletedContainer = styled.ul`
	display: flex;
	flex-direction: column;
	height: 440px;
	background-color: ${({ theme }) => theme.lightColor?.yellow.background};
	border-radius: 10px;
	overflow-y: auto;

	&::-webkit-scrollbar {
		display: none;
	}
	/* Firefox */
	scrollbar-width: none;
`;
const SeletedItem = styled.li`
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin: 20px 10px;
	padding: 15px 0;
	font-weight: ${({ theme }) => theme.fontWeight?.bold};
	border: 1px solid ${({ theme }) => theme.textColor?.lightbrown};
	background-color: ${({ theme }) => theme.textColor?.white};
	border-radius: 10px;
	.counter {
		display: flex;
		align-items: center;
		p {
			margin: 0 10px;
		}
		button {
			margin: 0 5px;
			width: 25px;
			height: 25px;
			border-radius: 5px;
			color: ${({ theme }) => theme.textColor?.white};
		}
		.plus {
			background-color: ${({ theme }) => theme.lightColor?.yellow.main};
		}
		.minus {
			background-color: ${({ theme }) => theme.textColor?.lightgray};
		}
	}
	.price {
		display: flex;
		align-items: center;
		justify-content: center;
		.delete {
			margin-left: 10px;
			width: 25px;
			height: 25px;
			border: 2px solid ${({ theme }) => theme.lightColor?.yellow.sub};
			color: ${({ theme }) => theme.lightColor?.yellow.sub};
			border-radius: 5px;
		}
	}
`;
const PayContainer = styled.div`
	flex: 0.3;
`;

const TotalPrice = styled.div`
	margin-top: 20px;
	height: 100px;
	padding: 20px 10px 10px 10px;
	color: ${({ theme }) => theme.lightColor?.yellow.point};
	background-color: ${({ theme }) => theme.textColor.lightbrown};
	font-size: ${({ theme }) => theme.fontSize['2xl']};
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	.total-price {
		float: right;
		font-size: ${({ theme }) => theme.fontSize['4xl']};
		color: ${({ theme }) => theme.textColor.black};
		right: 15px;
		bottom: 500px;
	}
`;
const AllDeleteBtn = styled.button`
	display: flex;
	justify-content: center;
	margin-top: 20px;
	width: 100%;
	padding: 15px;
	border: 1px solid ${({ theme }) => theme.textColor.darkgray};
	color: ${({ theme }) => theme.textColor.darkgray};
	border-radius: 10px;
	font-size: ${({ theme }) => theme.fontSize?.['3xl']};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	img {
		padding-right: 10px;
	}
`;
const OrderBtn = styled.button`
	display: flex;
	width: 100%;
	justify-content: center;
	border-radius: 10px;
	margin-top: 13px;
	padding: 15px;
	font-size: ${({ theme }) => theme.fontSize?.['3xl']};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	color: ${({ theme }) => theme.textColor.black};
	background-color: ${({ theme }) => theme.lightColor?.yellow.sub};
`;
export default SeletedItemContainer;
