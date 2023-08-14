import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/OrderHistory/Header';
import OrderListContainer from '../../components/OrderHistory/OrderListContainer';
import withAuth from '../../components/adminMode/WithAuth';

function OrderHistory() {
	const [isProgressMode, setIsProgressMode] = useState<boolean>(true);

	const handleIsProgressMode = useCallback(() => {
		setIsProgressMode(true);
	}, []);

	const handleIsCompleteMode = useCallback(() => {
		setIsProgressMode(false);
	}, []);

	return (
		<HistoryWrapper>
			<Header setIsProgress={handleIsProgressMode} setIsComplete={handleIsCompleteMode} />
			<OrderListContainer isProgressMode={isProgressMode} />
		</HistoryWrapper>
	);
}

export default withAuth(OrderHistory);

const HistoryWrapper = styled.div`
	width: 1194px;
	height: 834px;
	background-color: ${({ theme }) => (theme.lightColor ? '#f9f9f9' : theme.darkColor?.background)};
	overflow-y: auto;
`;
