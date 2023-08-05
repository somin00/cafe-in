import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { defaultTheme, darkTheme } from '../../style/theme';
import { useRecoilValue } from 'recoil';
import { selectedOptionsState } from '../../firebase/FirStoreDoc';
import { db } from '../../firebase/firebaseConfig';
import { selectedItem } from '../../state/OptinalState';
import { collection, doc, updateDoc, deleteDoc, addDoc, onSnapshot, increment } from 'firebase/firestore';

function SelectedItemContainer() {
	const selectedOptions = useRecoilValue(selectedOptionsState);
	const navigate = useNavigate();

	const [selectedItems, setSelectedItems] = useState<selectedItem[]>([]);

	useEffect(() => {
		const selectedItemsCol = collection(db, 'selectedItem');

		const unsub = onSnapshot(selectedItemsCol, (snapshot) => {
			const updatedItems: (selectedItem | undefined)[] = snapshot.docs.map((doc) => {
				const data = doc.data();
				if (data.quantity !== undefined) {
					return { ...data, id: doc.id, options: data.options } as selectedItem;
				}
			});
			setSelectedItems(updatedItems.filter((item) => item !== undefined) as selectedItem[]);
		});
		return () => unsub();
	}, []);
	const handleItemDelete = (itemName: string) => {
		deleteDoc(doc(db, 'selectedItem', itemName));
	};

	const handleIncreaseCount = async (itemName: string) => {
		const docRef = doc(db, 'selectedItem', itemName);
		await updateDoc(docRef, {
			quantity: increment(1),
		});
	};

	const handleDecreaseCount = async (itemName: string) => {
		const docRef = doc(db, 'selectedItem', itemName);
		await updateDoc(docRef, {
			quantity: increment(-1),
		});
	};

	const totalPrice = selectedItems.reduce((acc, item) => acc + item.totalPrice * item.quantity, 0);

	const handleDeleteAll = () => {
		setSelectedItems([]);
	};

	const handleAddOrderMoveTo = async () => {
		navigate('/order');
		selectedItems.forEach(async (item) => {
			const newOrder = {
				category: item.category,
				data: new Date(),
				name: item.name,
				options: item.options,
				progress: '완료주문',
				quantity: item.quantity,
				totalPrice: item.totalPrice * item.quantity,
			};

			await addDoc(collection(db, 'orderList'), newOrder);
		});
	};
	return (
		<Background>
			<Layout>
				<MenuSelectedContainer>
					{selectedItems.map((item) => (
						<SelectedItem key={item.id}>
							<div className="first">
								<p>{item.name}</p>
								<div className="counter">
									<button
										className={item.quantity > 1 ? 'minus active' : 'minus'}
										onClick={() => handleDecreaseCount(item.name)}
									>
										-
									</button>
									<p>x{item.quantity}</p>
									<button className="plus" onClick={() => handleIncreaseCount(item.id)}>
										+
									</button>
								</div>
								<div className="price">
									<p>{(item.totalPrice * item.quantity).toLocaleString()}원</p>
									<button className="delete" onClick={() => handleItemDelete(item.id)}>
										x
									</button>
								</div>
							</div>
							<OptionsSelected noOptions={item.options === '없음'}>
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
					<OrderBtn onClick={handleAddOrderMoveTo}>
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
const MenuSelectedContainer = styled.ul`
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
const SelectedItem = styled.li`
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

const OptionsSelected = styled.div<{ noOptions: boolean }>`
	display: flex;
	width: 100%;
	justify-content: end;
	margin-top: ${({ noOptions }) => (noOptions ? '0' : '10px')};
	padding-top: ${({ noOptions }) => (noOptions ? '0' : '6px')};
	border-top: ${({ noOptions, theme }) => (noOptions ? 'none' : `1px solid ${theme.textColor.lightbrown}`)};
	font-size: ${({ theme }) => theme.fontSize.sm};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	color: ${({ theme }) => theme.textColor.lightgray};
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
export default SelectedItemContainer;
