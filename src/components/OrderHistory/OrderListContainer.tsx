import React from 'react';
import { styled } from 'styled-components';
import OrderList from './OrderList';

function OrderListContainer() {
	return (
		<OrderListContainerWrapper>
			<OrderList />
		</OrderListContainerWrapper>
	);
}

export default OrderListContainer;

const OrderListContainerWrapper = styled.div`
	width: 1072px;
	margin: 0 auto;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	column-gap: 12px;
	row-gap: 20px;
	margin-top: 54px;
`;
