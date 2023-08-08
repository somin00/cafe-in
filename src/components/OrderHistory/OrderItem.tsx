import React from 'react';
import styled from 'styled-components';
import { OrderListItemType } from '../../types/orderHistoryType';

interface OrderItemPropType {
	itemInfo: OrderListItemType;
}
function OrderItem({ itemInfo }: OrderItemPropType) {
	const handleToggleComplete = () => {
		console.log(itemInfo.isComplete);
	};
	return (
		<OrderItemWrapper>
			<Info>
				<input type="checkbox" checked={itemInfo.isComplete} onChange={handleToggleComplete} />
				<span>{itemInfo.quantity}개</span>
			</Info>
			<span>{itemInfo.menu}</span>
		</OrderItemWrapper>
	);
}

export default OrderItem;

const OrderItemWrapper = styled.li`
	background-color: ${({ theme }) => theme.textColor.white};
	border-radius: 10px;
	margin-bottom: 19px;
	font-size: ${({ theme }) => theme.fontSize['2xl']};
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 10px;
	border: ${({ theme }) => (theme.lightColor ? 'none' : theme.textColor.darkgray)} 1px solid;
`;

const Info = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 10px;

	span {
		font-size: ${({ theme }) => theme.fontSize['xl']};
	}
	input {
		width: 20px;
		height: 20px;
		margin-right: 10px;
	}
`;
