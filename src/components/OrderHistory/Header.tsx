import React, { useRef } from 'react';
import styled from 'styled-components';
import ManagementHeader from '../adminMode/ManagementHeader';

interface HeaderPropType {
	setIsProgress: () => void;
	setIsComplete: () => void;
}
function Header({ setIsProgress, setIsComplete }: HeaderPropType) {
	const progressRef = useRef<HTMLButtonElement>(null);
	const completeRef = useRef<HTMLButtonElement>(null);

	const handleClickProgress = () => {
		completeRef.current?.classList.remove('is-selected');
		progressRef.current?.classList.add('is-selected');
		setIsProgress();
	};

	const handleClickComplete = () => {
		progressRef.current?.classList.remove('is-selected');
		completeRef.current?.classList.add('is-selected');
		setIsComplete();
	};
	return (
		<>
			<HeadWrapper>
				<ManagementHeader headerText="주문 내역">
					<ButtonContainer>
						<button type="button" className="is-selected" ref={progressRef} onClick={handleClickProgress}>
							진행중
						</button>
						<button type="button" ref={completeRef} onClick={handleClickComplete}>
							완료주문
						</button>
					</ButtonContainer>
				</ManagementHeader>
			</HeadWrapper>
		</>
	);
}

export default Header;

const HeadWrapper = styled.div`
	display: flex;
	align-items: center;
`;

const ButtonContainer = styled.div`
	display: flex;
	button {
		width: 140px;
		height: 56px;
		border-radius: 10px;
		font-size: ${({ theme }) => theme.fontSize['2xl']};
		font-weight: ${({ theme }) => theme.fontWeight.medium};
		background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.darkColor?.background)};
		border: ${({ theme }) => (theme.lightColor ? theme.lightColor?.yellow.point : theme.textColor.darkgray)} 1px solid;
		color: ${({ theme }) => (theme.lightColor ? theme.lightColor?.yellow.point : theme.textColor.darkgray)};

		&:first-child {
			margin-right: 6px;
		}

		&.is-selected {
			background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor?.yellow.point : theme.textColor.white)};
			color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.textColor.black)};
		}
	}
`;
