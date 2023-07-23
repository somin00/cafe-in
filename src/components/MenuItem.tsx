import React from 'react';
import { styled } from 'styled-components';

function MenuItem() {
	return (
		<Layout>
			<ItemContainer>
				<img src="/assets/user/IceCoffee.svg" alt="Ice Coffee" />
				<p className="menu-name"> 아메리카노 [Iced]</p>
				<p className="menu-price">4,500원</p>
			</ItemContainer>
			<ItemContainer>
				<img src="/assets/user/IceCoffee.svg" alt="Ice Coffee" />
				<p className="menu-name"> 아메리카노 [Iced]</p>
				<p className="menu-price">4,500원</p>
			</ItemContainer>
			<ItemContainer>
				<img src="/assets/user/IceCoffee.svg" alt="Ice Coffee" />
				<p className="menu-name"> 아메리카노 [Iced]</p>
				<p className="menu-price">4,500원</p>
			</ItemContainer>

			<ItemContainer>
				<img src="/assets/user/IceCoffee.svg" alt="Ice Coffee" />
				<p className="menu-name"> 아메리카노 [Iced]</p>
				<p className="menu-price">4,500원</p>
			</ItemContainer>
			<ItemContainer>
				<img src="/assets/user/IceCoffee.svg" alt="Ice Coffee" />
				<p className="menu-name"> 아메리카노 [Iced]</p>
				<p className="menu-price">4,500원</p>
			</ItemContainer>
			<ItemContainer>
				<img src="/assets/user/IceCoffee.svg" alt="Ice Coffee" />
				<p className="menu-name"> 아메리카노 [Iced]</p>
				<p className="menu-price">4,500원</p>
			</ItemContainer>
			<ItemContainer>
				<img src="/assets/user/IceCoffee.svg" alt="Ice Coffee" />
				<p className="menu-name"> 아메리카노 [Iced]</p>
				<p className="menu-price">4,500원</p>
			</ItemContainer>
		</Layout>
	);
}
const Layout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 8px;
`;
const ItemContainer = styled.div`
	background-color: ${({ theme }) => theme.textColor?.white};
	border: 1px solid ${({ theme }) => theme.textColor?.lightbrown};
	border-radius: 15px;
	padding: 13px 16px;
	text-align: center;
	.menu-name {
		font-weight: ${({ theme }) => theme.fontWeight.bold};
	}
	.menu-price {
		margin-top: 7px;
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
	}
`;

export default MenuItem;
