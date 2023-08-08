import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import OrderList from './OrderList';
import { OrderListType } from '../../types/orderHistoryType';
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

interface ContainerPropType {
	isProgressMode: boolean;
}
function OrderListContainer({ isProgressMode }: ContainerPropType) {
	const [inProgressList, setInProgressList] = useState<OrderListType[]>([]);
	const [completeList, setCompleteList] = useState<OrderListType[]>([]);

	const fetchInProgress = async () => {
		const orderListRef = collection(db, 'testOrderList'); //orderList 완성시 수정
		const unsub = onSnapshot(query(orderListRef, where('progress', '==', '진행중'), orderBy('id')), (snapshot) => {
			const inProgress: OrderListType[] = [];
			snapshot.docs.map((doc) => {
				const listObj = doc.data() as OrderListType;
				inProgress.push(listObj);
			});
			setInProgressList(inProgress);
		});
		return unsub;
	};

	const fetchComplete = async () => {
		const orderListRef = collection(db, 'testOrderList'); //orderList 완성시 수정
		const unsub = onSnapshot(query(orderListRef, where('progress', '==', '완료주문'), orderBy('id')), (snapshot) => {
			const complete: OrderListType[] = [];
			snapshot.docs.map((doc) => {
				const listObj = doc.data() as OrderListType;
				complete.push(listObj);
			});
			setCompleteList(complete);
		});
		return unsub;
	};

	useEffect(() => {
		fetchInProgress();
		fetchComplete();
	}, []);

	return (
		<OrderListContainerWrapper>
			{isProgressMode ? <OrderList orderList={inProgressList} /> : <OrderList orderList={completeList} />}
		</OrderListContainerWrapper>
	);
}

export default OrderListContainer;

const OrderListContainerWrapper = styled.ul`
	width: 1072px;
	margin: 0 auto;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	column-gap: 12px;
	row-gap: 20px;
	margin-top: 54px;
`;
