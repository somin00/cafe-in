import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { defaultTheme, darkTheme } from '../../style/theme';
import { useRecoilValue } from 'recoil';
import { fetchSelectedItems, selectedOptionsState } from '../../firebase/FirStoreDoc';
import { db } from '../../firebase/firebaseConfig';
import { seletedItem } from '../../state/OptinalState';
import { Firestore, collection, getDocs } from 'firebase/firestore';

function SeletedItemContainer() {
	const selectedOptions = useRecoilValue(selectedOptionsState);
	const navigate = useNavigate();
	const [selectedItems, setSelectedItems] = useState<seletedItem[]>([]);
	const fetchSelectedItems = async (db: Firestore) => {
		const selectedItemsCol = collection(db, 'seletedItem');
		const selectedItemsSnapshot = await getDocs(selectedItemsCol);
		const selectedItems: seletedItem[] = selectedItemsSnapshot.docs.map(
			(doc) => ({ ...doc.data(), id: doc.id }) as seletedItem,
		);
		return selectedItems;
	};
	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchSelectedItems(db);
			setSelectedItems(data);
		};

		fetchData();
	}, []);
	const handleItemDelete = (itemName: string) => {
		setSelectedItems((prevItems) => prevItems.filter((item) => item.menu !== itemName));
	};

	const handleIncreaseCount = (itemName: string) => {
		setSelectedItems((prevItems) =>
			prevItems.map((item) => (item.menu === itemName ? { ...item, count: item.quantity + 1 } : item)),
		);
	};

	const handleDecreaseCount = (itemName: string) => {
		setSelectedItems((prevItems) =>
			prevItems.map((item) =>
				item.menu === itemName && item.quantity > 1 ? { ...item, count: item.quantity - 1 } : item,
			),
		);
	};

	const totalPrice = selectedItems.reduce((acc, item) => acc + item.totalPrice * item.quantity, 0);

	const handleDeleteAll = () => {
		setSelectedItems([]);
		console.log('선택된 옵션들: ', selectedOptions);
	};
	return (
		<Background>
			<Layout>
				<MenuSeletedContainer>
					{selectedItems.map((item) => (
						<SeletedItem key={item.menu}>
							<p>{item.menu}</p>
							<div className="counter">
								<button
									className={item.quantity > 1 ? 'minus active' : 'minus'}
									onClick={() => handleDecreaseCount(item.menu)}
								>
									-
								</button>
								<p>x{item.quantity}</p>
								<button className="plus" onClick={() => handleIncreaseCount(item.menu)}>
									+
								</button>
							</div>
							<div className="price">
								<p>{(item.totalPrice * item.quantity).toLocaleString()}원</p>
								<button className="delete" onClick={() => handleItemDelete(item.menu)}>
									x
								</button>
							</div>
							<div className="options-seleted">
								{selectedOptions.map((option, index) => (
									<p key={index}>{option.name}</p>
								))}
							</div>
						</SeletedItem>
					))}
				</MenuSeletedContainer>
				<PayContainer>
					<TotalPrice>
						<p>총 결제 금액</p>
						<p className="total-price">{totalPrice.toLocaleString()}원</p>
					</TotalPrice>
					<AllDeleteBtn onClick={handleDeleteAll}>
						<img src="/assets/user/AllDeleteBtn.svg" alt="전체삭제" />
						<p>전체삭제</p>
					</AllDeleteBtn>
					<OrderBtn onClick={() => navigate('/order')}>
						<p>주문하기</p>
					</OrderBtn>
				</PayContainer>
			</Layout>
		</Background>
	);
}
const Background = styled.div`
	background-color: ${({ theme }) =>
		theme === defaultTheme ? defaultTheme.textColor.white : darkTheme.textColor.black};
	padding: 10px;
	height: fit-content;
`;
const Layout = styled.div`
	width: 381px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;
const MenuSeletedContainer = styled.ul`
	display: flex;
	flex-direction: column;
	height: 440px;
	background-color: ${({ theme }) =>
		theme === defaultTheme ? defaultTheme.lightColor?.yellow.background : darkTheme.textColor.black};
	border-radius: 10px;
	overflow-y: auto;

	&::-webkit-scrollbar {
		display: none;
	}
	/* Firefox */
	scrollbar-width: none;
`;
const SeletedItem = styled.li`
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin: 20px 10px;
	padding: 15px 0;
	font-weight: ${({ theme }) => theme.fontWeight?.bold};
	border: 1px solid ${({ theme }) => theme.textColor?.lightbrown};
	background-color: ${({ theme }) => theme.textColor?.white};
	border-radius: 10px;
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
				theme === defaultTheme ? defaultTheme.lightColor?.yellow.main : darkTheme.darkColor?.sub};
		}
		.minus {
			background-color: ${({ theme }) =>
				theme === defaultTheme ? defaultTheme.textColor.lightgray : darkTheme.textColor.darkgray};
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
const PayContainer = styled.div`
	flex: 0.3;
`;

const TotalPrice = styled.div`
	margin-top: 20px;
	height: 110px;
	padding: 20px 10px 10px 10px;
	color: ${({ theme }) => theme.lightColor?.yellow.point};
	background-color: ${({ theme }) => (theme === defaultTheme ? theme.textColor.lightbrown : darkTheme.textColor.black)};
	border-top: ${({ theme }) => (theme === darkTheme ? '1px solid  darkTheme.textColor.lightgray' : 'none')};
	font-size: ${({ theme }) => theme.fontSize['2xl']};
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	.total-price {
		float: right;
		font-size: ${({ theme }) => theme.fontSize['4xl']};
		color: ${({ theme }) => theme.textColor.black};
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
export default SeletedItemContainer;
