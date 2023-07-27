import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { selectedOptionsState, Option } from '../state/OptinalState';

interface ModalDefaultType {
	onClickToggleModal: () => void;
}
function OptionMenu({ onClickToggleModal }: ModalDefaultType) {
	const [selectedOptions, setSelectedOptions] = useRecoilState<Option[]>(selectedOptionsState);
	const [activeOptions, setActiveOptions] = useState<string[]>([]);
	const options: Option[] = [
		{ category: '음료선택', name: 'HOT', price: 0 },
		{ category: '음료선택', name: 'ICE', price: 0 },
		{ category: '추가선택', name: '샷추가', price: 500 },
		{ category: '추가선택', name: '시럽추가', price: 500 },
		{ category: '농도선택', name: '연하게', price: 0 },
		{ category: '농도선택', name: '진하게', price: 0 },
		{ category: '농도선택', name: '얼음 많이', price: 0 },
		{ category: '농도선택', name: '얼음적게', price: 0 },
	];
	const categories = options.reduce((result: Record<string, Option[]>, option) => {
		if (!result[option.category]) {
			result[option.category] = [];
		}
		result[option.category].push(option);
		return result;
	}, {});
	const handleOptionClick = (e: React.MouseEvent, option: Option) => {
		e.preventDefault();

		// 카테고리별로 선택되어 있는 옵션 개수를 확인
		const selectedInCategory = selectedOptions.filter((selectedOption) => selectedOption.category === option.category);
		// 음료선택 카테고리의 선택 제한 로직
		if (option.category === '음료선택') {
			if (selectedInCategory.length >= 1) {
				// 선택된 옵션을 취소하고 새로운 옵션을 선택
				setSelectedOptions((oldSelectedOptions) =>
					oldSelectedOptions.filter((selectedOption) => selectedOption.category !== option.category).concat(option),
				);
				setActiveOptions((oldActiveOptions) =>
					oldActiveOptions
						.filter((activeOption) => !selectedInCategory.map((o) => o.name).includes(activeOption))
						.concat(option.name),
				);
				return;
			}
		}

		if (activeOptions.includes(option.name)) {
			setActiveOptions((oldActiveOptions) => oldActiveOptions.filter((activeOption) => activeOption !== option.name));
			setSelectedOptions((oldSelectedOptions) =>
				oldSelectedOptions.filter((selectedOption) => selectedOption.name !== option.name),
			);
		} else {
			setSelectedOptions((oldSelectedOptions: Option[]) => [...oldSelectedOptions, option]);
			setActiveOptions((oldActiveOptions) => [...oldActiveOptions, option.name]);
		}
	};

	const handleCloseBtnClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		onClickToggleModal();
	};
	return (
		<ModalContainer onClick={onClickToggleModal}>
			<DialogBox onClick={(e) => e.stopPropagation()}>
				<h1>원하는 옵션을 선택해주세요</h1>
				<Layout>
					{Object.entries(categories).map(([category, options]) => (
						<CheckMenuContainer key={category}>
							<p className="category">{category}</p>
							<div>
								{(options as Option[]).map((option: Option) => (
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
