import React from 'react';
import styled from 'styled-components';
function OrderItem() {
	return (
		<OrderItemWrapper>
			<span>아메리카노</span>
			<span>1</span>
			<input type="checkbox" name="" id="" />
		</OrderItemWrapper>
	);
}

export default OrderItem;

const OrderItemWrapper = styled.div`
	height: 60px;
	background-color: ${({ theme }) => theme.textColor.white};
	border-radius: 10px;
	margin-bottom: 19px;
	font-size: ${({ theme }) => theme.fontSize['3xl']};
	display: flex;
	justify-content: space-around;
	align-items: center;
	border: ${({ theme }) => (theme.lightColor ? 'none' : theme.textColor.darkgray)} 1px solid;
	input {
		width: 20px;
		height: 20px;
	}
`;
