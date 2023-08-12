import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

function Start() {
	const navigate = useNavigate();

	return (
		<StartWrapper>
			<TakeOutBoxWrapper>
				<TakeOutBox
					onClick={() => {
						navigate('/menu');
					}}
					aria-label="매장에서 먹고 가기 선택"
				>
					매장
				</TakeOutBox>
				<TakeOutBox
					onClick={() => {
						navigate('/menu');
					}}
					aria-label="테이크 아웃 선택"
				>
					테이크 아웃
				</TakeOutBox>
			</TakeOutBoxWrapper>
		</StartWrapper>
	);
}

export default Start;

const StartWrapper = styled.div`
	width: 1194px;
	height: 834px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.lightBeige : theme.darkColor?.background)};
	user-select: none;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const TakeOutBoxWrapper = styled.div`
	width: 834px;
	display: flex;
	justify-content: space-between;
`;

const TakeOutBox = styled.button`
	width: 350px;
	height: 416px;
	border-radius: 15px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor.yellow.background : theme.darkColor?.main)};
	border: 3px solid ${({ theme }) => (theme.lightColor ? theme.lightColor.yellow.point : theme.darkColor?.main)};
	color: ${({ theme }) => (theme.lightColor ? theme.lightColor.yellow.point : theme.textColor.white)};
	font-size: ${({ theme }) => theme.fontSize['6xl']};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;
