import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { defaultTheme, darkTheme } from '../../style/theme';

import { useRecoilState } from 'recoil';
import { selectedItemsState } from '../../firebase/FirStoreDoc';
import { orderListStateAtom } from '../../state/OrderListAtom';
import { OrderProgress } from '../../types/Order';
type StyledProps = {
	$quantity: number;
};

function SelectedItemContainer() {
	const navigate = useNavigate();

	const [selectedItems, setSelectedItems] = useRecoilState(selectedItemsState);
	const [orderList, setOrderList] = useRecoilState(orderListStateAtom);
	const handleItemDelete = (itemName: string) => {
		setSelectedItems((prev) => prev.filter((item) => item.id.toString() !== itemName));
	};

	const handleIncreaseCount = async (itemName: string) => {
		setSelectedItems((prev) =>
			prev.map((item) => {
				if (item.id.toString() === itemName) {
					return { ...item, quantity: item.quantity + 1 };
				}
				return item;
			}),
		);
	};

	const handleDecreaseCount = async (itemName: string) => {
		setSelectedItems((prev) =>
			prev.map((item) => {
				if (item.id.toString() === itemName && item.quantity > 1) {
					return { ...item, quantity: item.quantity - 1 };
				}
				return item;
			}),
		);
	};

	const totalPrice = selectedItems.reduce((acc, item) => acc + item.totalPrice * item.quantity, 0);
	const handleDeleteAll = () => {
		setSelectedItems([]);
	};

	const handleAddOrderMoveTo = async () => {
		navigate('/order');

		const newOrder = {
			id: Date.now(),
			date: Date(),
			progress: '주문완료' as OrderProgress,
			takeOut: true,
			list: selectedItems.map((item) => ({
				menu: item.name,
				imgUrl: item.imageUrl || '/assets/user/IceCoffee.svg',
				quantity: item.quantity,
				options: item.options,
				isComplete: false,
				totalPrice: item.totalPrice * item.quantity,
			})),
		};

		setOrderList((prev) => [...prev, newOrder]);
		// 선택된 항목 초기화
		handleDeleteAll();
	};
	useEffect(() => {
		let lastInteraction = Date.now();
		const timeoutDuration = 10000; // 10초
		let timeoutRef: string | number | NodeJS.Timeout | undefined;

		const handleUserInteraction = () => {
			lastInteraction = Date.now();

			if (timeoutRef) {
				clearTimeout(timeoutRef);
			}

			timeoutRef = setTimeout(() => {
				const currentTime = Date.now();
				if (currentTime - lastInteraction > timeoutDuration) {
					handleDeleteAll();
				}
			}, timeoutDuration);
		};

		window.addEventListener('click', handleUserInteraction);

		return () => {
			window.removeEventListener('click', handleUserInteraction);
			if (timeoutRef) {
				clearTimeout(timeoutRef);
			}
		};
	}, [handleDeleteAll]);
	return (
		<Background>
			<Layout>
				<MenuSelectedContainer>
					{selectedItems.map((item) => (
						<SelectedItem as="li" key={item.id} $quantity={item.quantity}>
							<div className="first">
								<p>{item.name}</p>
								<div className="counter">
									<button
										className="minus"
										disabled={item.quantity <= 1}
										onClick={() => handleDecreaseCount(item.id.toString())}
									>
										-
									</button>
									<p>x{item.quantity}</p>
									<button className="plus" onClick={() => handleIncreaseCount(item.id.toString())}>
										+
									</button>
								</div>
								<div className="price">
									<p>{(item.totalPrice * item.quantity).toLocaleString()}원</p>
									<button className="delete" onClick={() => handleItemDelete(item.id.toString())}>
										x
									</button>
								</div>
							</div>
							<OptionsSelected $noOptions={item.options === '없음'}>
								{item.options !== '없음' && <p key={item.name}>{item.options}</p>}
							</OptionsSelected>
						</SelectedItem>
					))}
				</MenuSelectedContainer>
				<PayContainer>
					<TotalPrice>
						<p>총 결제 금액</p>
						<p className="total-price">{totalPrice.toLocaleString()}원</p>
					</TotalPrice>
					<AllDeleteBtn onClick={handleDeleteAll}>
						<img src="/assets/user/AllDeleteBtn.svg" alt="전체삭제" />
						<p>전체삭제</p>
					</AllDeleteBtn>
					<OrderBtn disabled={selectedItems.length === 0} onClick={handleAddOrderMoveTo}>
						<p>주문하기</p>
					</OrderBtn>
				</PayContainer>
			</Layout>
		</Background>
	);
}
const Background = styled.div`
	background-color: ${({ theme }) =>
		theme === defaultTheme ? defaultTheme.textColor.white : darkTheme.darkColor.background};
	padding: 10px;
	height: fit-content;
`;
const Layout = styled.div`
	width: 381px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-left: ${({ theme }) => (theme.mode === 'dark' ? 'none' : ' 1px solid white')};
`;
const MenuSelectedContainer = styled.ul`
	display: flex;
	flex-direction: column;
	height: 440px;
	background-color: ${({ theme }) =>
		theme === defaultTheme ? defaultTheme.lightColor?.yellow.background : darkTheme.darkColor.background};
	border-radius: 10px;
	overflow-y: auto;

	&::-webkit-scrollbar {
		display: none;
	}
	/* Firefox */
	scrollbar-width: none;
`;
const SelectedItem = styled.li<StyledProps>`
	display: flex;
	width: 359px;
	flex-direction: column;
	align-items: flex-end;
	margin: 10px;
	padding: 15px 10px;

	font-weight: ${({ theme }) => theme.fontWeight?.bold};
	border: 1px solid ${({ theme }) => theme.textColor?.lightbrown};
	background-color: ${({ theme }) => theme.textColor?.white};
	border-radius: 10px;
	.first {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.counter,
	.price {
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.counter {
		display: flex;
		align-items: center;
		p {
			margin: 0 10px;
		}
		button {
			margin: 0 5px;
			width: 25px;
			height: 25px;
			border-radius: 5px;
			color: ${({ theme }) => theme.textColor?.white};
		}
		.plus {
			background-color: ${({ theme }) =>
				theme === defaultTheme ? defaultTheme.lightColor?.yellow.main : darkTheme.darkColor?.main};
		}
		.minus {
			background-color: ${({ theme, $quantity }) => {
				if (theme === defaultTheme) {
					return $quantity > 1 ? theme.lightColor?.yellow.main : defaultTheme.textColor.lightgray;
				} else {
					return $quantity > 1 ? darkTheme.darkColor?.main : darkTheme.textColor.darkgray;
				}
			}};
			&:disabled {
				pointer-events: none;
			}
		}
	}
	.price {
		display: flex;
		align-items: center;
		justify-content: center;
		.delete {
			margin-left: 10px;
			width: 25px;
			height: 25px;
			border: 2px solid
				${({ theme }) => (theme === defaultTheme ? defaultTheme.lightColor?.yellow.sub : darkTheme.darkColor?.point)};
			color: ${({ theme }) =>
				theme === defaultTheme ? defaultTheme.lightColor?.yellow.sub : darkTheme.darkColor?.point};
			border-radius: 5px;
		}
	}
`;

const OptionsSelected = styled.div<{ $noOptions: boolean }>`
	display: flex;
	width: 100%;
	margin-left: 10px;
	text-overflow: ellipsis;
	justify-content: start;
	margin-top: ${({ $noOptions }) => ($noOptions ? '0' : '10px')};
	padding-top: ${({ $noOptions }) => ($noOptions ? '0' : '6px')};
	border-top: ${({ $noOptions, theme }) => ($noOptions ? 'none' : `1px solid ${theme.textColor.lightbrown}`)};
	font-size: ${({ theme }) => theme.fontSize.sm};
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	color: ${({ theme }) => theme.textColor.darkgray};
`;
const PayContainer = styled.div`
	flex: 0.3;
	overflow: hidden;
	margin-left: 10px;
	border-top: ${({ theme }) => (theme.mode === 'dark' ? 'none' : ' 1px solid white')};
`;

const TotalPrice = styled.div`
	margin-top: 20px;
	height: 110px;
	padding: 20px 10px 10px 10px;
	color: ${defaultTheme.lightColor.yellow.point};
	background-color: ${({ theme }) =>
		theme === defaultTheme ? theme.textColor.lightbrown : darkTheme.darkColor.background};
	border-top: ${({ theme }) => (theme === darkTheme ? '1px solid  darkTheme.textColor.lightgray' : 'none')};
	font-size: ${({ theme }) => theme.fontSize['2xl']};
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	& p:first-child {
		color: ${({ theme }) =>
			theme === darkTheme ? defaultTheme.lightColor.yellow.point : darkTheme.textColor.lightbrown};
	}
	.total-price {
		float: right;
		font-size: ${({ theme }) => theme.fontSize['4xl']};
		color: ${({ theme }) => (theme === darkTheme ? theme.textColor.black : darkTheme.textColor.white)};
		right: 15px;
		bottom: 500px;
	}
`;
const AllDeleteBtn = styled.button`
	display: flex;
	justify-content: center;
	margin-top: 20px;
	width: 100%;
	padding: 15px;
	border: 1px solid ${({ theme }) => theme.textColor.darkgray};
	color: ${({ theme }) => theme.textColor.darkgray};
	border-radius: 10px;
	font-size: ${({ theme }) => theme.fontSize?.['3xl']};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	img {
		margin-top: 3px;
		padding-right: 10px;
	}
`;
const OrderBtn = styled.button`
	display: flex;
	width: 100%;
	justify-content: center;
	border-radius: 10px;
	margin-top: 13px;
	padding: 15px;
	font-size: ${({ theme }) => theme.fontSize?.['3xl']};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	color: ${({ theme }) => theme.textColor.black};
	background-color: ${({ theme }) =>
		theme === defaultTheme ? theme.lightColor?.yellow.sub : darkTheme.darkColor?.point};
`;
export default SelectedItemContainer;
