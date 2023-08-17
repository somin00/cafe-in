import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { OrderListItemType } from '../../types/orderHistoryType';

interface OrderItemPropType {
	idx: number;
	itemInfo: OrderListItemType;
	toggleComplete: (id: number, checked: boolean) => void;
}
function OrderItem({ idx, itemInfo, toggleComplete }: OrderItemPropType) {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const checked = e.currentTarget.checked;
		toggleComplete(idx, checked);
	};

	return (
		<OrderItemWrapper>
			<Info>
				<input type="checkbox" checked={itemInfo.isComplete} onChange={handleChange} />
				<span>{itemInfo.quantity}개</span>
			</Info>
			<MenuName className={itemInfo.isComplete ? 'is-checked' : ''}>{itemInfo.menu}</MenuName>
			<MenuOptions>{itemInfo.options !== '없음' && itemInfo.options}</MenuOptions>
		</OrderItemWrapper>
	);
}

export default OrderItem;

const OrderItemWrapper = styled.li`
	background-color: ${({ theme }) => theme.textColor.white};
	border-radius: 10px;
	margin-bottom: 10px;
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

const MenuName = styled.span`
	&.is-checked {
		text-decoration: line-through;
		color: ${({ theme }) => theme.textColor.darkgray};
	}
`;

const MenuOptions = styled.span`
	margin-top: 10px;
	font-size: ${({ theme }) => theme.fontSize['xl']};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	color: ${({ theme }) => theme.textColor.darkgray};
`;
