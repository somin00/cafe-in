import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Option } from '../../state/OptinalState';
import { db } from '../../firebase/firebaseConfig';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { Item } from '../../state/Category';
export interface OptionMenuProps {
	selected: Item;
	onClickToggleModal: () => void;
}
function OptionMenu({ selected, onClickToggleModal }: OptionMenuProps) {
	const [options, setOptions] = useState<{ [key: string]: Option[] }>({});
	const [activeOptions, setActiveOptions] = useState<string[]>([]);

	const [selectedItemOptions, setSelectedItemOptions] = useState<Option[]>([]);

	useEffect(() => {
		const fetchOptions = async () => {
			const optionsCollection = collection(db, 'options');
			const optionsSnapshot = await getDocs(optionsCollection);

			if (optionsSnapshot.docs.length > 0) {
				const fetchedOptions = optionsSnapshot.docs[0].data() as { [key: string]: Option[] };

				const customOrder = ['음료선택', '추가선택', '농도선택'];
				const orderedOptions: { [key: string]: Option[] } = {};
				customOrder.forEach((key) => {
					if (key in fetchedOptions) {
						orderedOptions[key] = fetchedOptions[key];
					}
				});
				setOptions(orderedOptions);
			}
		};
		setSelectedItemOptions([]);
		fetchOptions();
	}, [selected]);

	const handleOptionClick = (e: React.MouseEvent, option: Option) => {
		e.preventDefault();

		const selectedInCategory = selectedItemOptions.filter(
			(selectedOption) => selectedOption.category === option.category,
		);

		if (option.category === '음료선택') {
			if (selectedInCategory.length >= 1) {
				setSelectedItemOptions((oldSelectedOptions) =>
					oldSelectedOptions.filter((selectedOption) => selectedOption.category !== option.category).concat(option),
				);
				setActiveOptions((oldActiveOptions) => {
					const newActiveOptions = oldActiveOptions.filter(
						(activeOption) => activeOption !== selectedInCategory[0].name,
					);
					newActiveOptions.push(option.name);
					return newActiveOptions;
				});
				return;
			}
		}

		if (selectedItemOptions.some((selectedOption) => selectedOption.name === option.name)) {
			setSelectedItemOptions((oldSelectedOptions) =>
				oldSelectedOptions.filter((selectedOption) => selectedOption.name !== option.name),
			);
			setActiveOptions((oldActiveOptions) => oldActiveOptions.filter((activeOption) => activeOption !== option.name));
		} else {
			setSelectedItemOptions((oldSelectedOptions: Option[]) => [...oldSelectedOptions, option]);
			setActiveOptions((oldActiveOptions) => [...oldActiveOptions, option.name]);
		}
	};

	const handleCloseBtnClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		const itemToBeAdded = {
			...selected,
			data: new Date(),
			quantity: 1,
			options: selectedItemOptions.length > 0 ? selectedItemOptions.map((i) => i.name).join(',') : '없음', // 선택된 옵션을 추가
			totalPrice: selected.price,
		};
		const itemsCollection = collection(db, 'selectedItem');
		addDoc(itemsCollection, itemToBeAdded);

		console.log(itemToBeAdded);
		onClickToggleModal();
	};

	return (
		<ModalContainer onClick={onClickToggleModal}>
			<DialogBox onClick={(e) => e.stopPropagation()}>
				<h1>원하는 옵션을 선택해주세요</h1>
				<Layout>
					{Object.entries(options).map(([category, options]) => (
						<CheckMenuContainer key={category} onClick={() => handleOptionClick}>
							<p className="category">{category}</p>
							<div>
								{options.map((option: Option) => (
									<CheckOption
										key={option.name}
										onClick={(e) => handleOptionClick(e, option)}
										className={activeOptions.includes(option.name) ? 'active' : ''}
									>
										<p>{option.name}</p>
										<p>{option.price === 0 ? '+0' : `+${option.price}원`}</p>
									</CheckOption>
								))}
							</div>
						</CheckMenuContainer>
					))}
				</Layout>
				<CloseBtn onClick={handleCloseBtnClick}>담기</CloseBtn>
			</DialogBox>
			<Backdrop
				onClick={(e: React.MouseEvent) => {
					e.preventDefault();
					if (onClickToggleModal) {
						onClickToggleModal();
					}
				}}
			/>
		</ModalContainer>
	);
}

const ModalContainer = styled.div`
	width: 100%;
	height: 100%;
`;
const Layout = styled.div`
	width: 100%;
	padding-left: 40px;
	padding-right: 40px;
	padding-bottom: 20px;
	border-bottom: 1px solid ${({ theme }) => theme.textColor.lightgray};
`;
const DialogBox = styled.dialog`
	width: 700px;
	height: 700px;
	position: absolute;
	top: 0;
	left: 250px;
	display: flex;
	flex-direction: column;
	align-items: center;
	border: none;
	border-radius: 10px;
	box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
	box-sizing: border-box;
	z-index: 10000;
	h1 {
		width: 100%;
		font-size: ${({ theme }) => theme.fontSize['2xl']};
		padding: 25px;
		border-bottom: 1px solid ${({ theme }) => theme.textColor.lightgray};
	}
`;
const CheckMenuContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	padding-top: 20px;
	.category {
		margin: 10px 0;
		font-size: ${({ theme }) => theme.fontSize['xl']};
	}
`;
const CheckOption = styled.button`
	background-color: ${({ theme }) => theme.textColor.lightgray};
	border-radius: 10px;
	width: 120px;
	height: 120px;
	margin-right: 10px;
	p {
		padding: 20px;
	}
	&:active {
		background-image: url('/assets/user/check.svg');
		background-repeat: no-repeat;
		background-position: center;
	}
	&.active {
		background-image: url('/assets/user/check.svg');
		background-repeat: no-repeat;
		background-position: center;
	}
`;
const CloseBtn = styled.button`
	margin-top: 10px;
	border-radius: 10px;
	background-color: burlywood;
	width: 110px;
	height: 45px;
	font-size: ${({ theme }) => theme.fontSize['2xl']};
`;
const Backdrop = styled.div`
	width: 1194px;
	height: 834px;
	position: fixed;
	top: 0;
	left: 50%;
	transform: translate(-50%, 0); /* 추가 */
	z-index: 9999;
	background-color: rgba(0, 0, 0, 0.2);
`;
export default OptionMenu;
