import React from 'react';
import styled from 'styled-components';
import Header from '../../components/OrderHistory/Header';
import OrderListContainer from '../../components/OrderHistory/OrderListContainer';
function OrderHistory() {
	return (
		<HistoryWrapper>
			<Header />
			<OrderListContainer />
		</HistoryWrapper>
	);
}

export default OrderHistory;

const HistoryWrapper = styled.div`
	width: 1194px;
	height: 100vh;
	background-color: ${({ theme }) => (theme.lightColor ? '#f9f9f9' : theme.darkColor?.background)};
	overflow-y: auto;
`;
