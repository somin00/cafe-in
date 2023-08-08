import React from 'react';
import styled from 'styled-components';
import OrderItem from './OrderItem';
import { OrderListType } from '../../types/orderHistoryType';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

interface OrderListPropType {
	number: number;
	order: OrderListType;
}
function OrderList({ number, order }: OrderListPropType) {
	const handleToggleComplete = async (id: number, checked: boolean) => {
		const orderRef = collection(db, 'testOrderList');
		const orderDocs = await getDocs(query(orderRef, where('id', '==', order.id)));
		if (orderDocs.docs.length !== 0) {
			const docData = orderDocs.docs[0].data();
			docData.list[id].isComplete = checked;
			await updateDoc(orderDocs.docs[0].ref, {
				...docData,
			});
		}
	};

	return (
		<>
			<OrderListWrapper key={order.id}>
				<OrderInfo>
					<span>{`#${number + 1}`}</span>
					<span>{order.takeout ? '포장' : '매장'}</span>
				</OrderInfo>
				<ItemWrapper>
					{order.list.map((item, idx) => (
						<OrderItem key={`${order.id}${idx}`} idx={idx} itemInfo={item} toggleComplete={handleToggleComplete} />
					))}
				</ItemWrapper>
				<button type="button">제조완료</button>
			</OrderListWrapper>
		</>
	);
}

export default OrderList;

const OrderListWrapper = styled.li`
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
		font-size: ${({ theme }) => theme.fontSize['2xl']};
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
		margin-left: 90px;
		color: ${({ theme }) => theme.textColor.white};
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
const ItemWrapper = styled.ul`
	width: 318px;
	height: 376px;
	margin-bottom: 19px;
	overflow-y: auto;
`;
