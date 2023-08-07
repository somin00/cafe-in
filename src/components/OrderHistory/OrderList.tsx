import React from 'react';
import styled from 'styled-components';
import OrderItem from './OrderItem';

function OrderList() {
	return (
		<OrderListWrapper>
			<OrderInfo>
				<span>#1</span>
				<span>매장</span>
			</OrderInfo>
			<ItemWrapper>
				<OrderItem />
			</ItemWrapper>
			<button type="button">제조완료</button>
		</OrderListWrapper>
	);
}

export default OrderList;

const OrderListWrapper = styled.div`
	background-color: ${({ theme }) =>
		theme.lightColor ? theme.lightColor?.yellow.background : theme.darkColor?.background};
	width: 350px;
	height: 560px;
	border-radius: 10px;
	padding: 20px 0 0 16px;
	border: ${({ theme }) => (theme.lightColor ? 'none' : theme.textColor.white)} 1px solid;

	button {
		width: 130px;
		height: 50px;
		border-radius: 10px;
		background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor?.yellow.main : theme.darkColor?.main)};
		font-size: ${({ theme }) => theme.fontSize['3xl']};
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
		margin-left: 90px;
		color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
	}
`;

const OrderInfo = styled.div`
	margin-bottom: 20px;
	font-size: ${({ theme }) => theme.fontSize['4xl']};
	color: ${({ theme }) => (theme.lightColor ? 'none' : theme.textColor.white)};

	span:first-child {
		font-weight: ${({ theme }) => theme.fontWeight.regular};
		margin-right: 11px;
	}

	span:last-child {
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
	}
`;
const ItemWrapper = styled.div`
	width: 318px;
	height: 376px;
	margin-bottom: 19px;
	overflow-y: auto;
`;
