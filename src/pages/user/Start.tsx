import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

function Start() {
	const navigate = useNavigate();

	return (
		<div>
			<h1>매장 vs 테이크아웃</h1>
			<Button
				onClick={() => {
					navigate('/menu');
				}}
			>
				메뉴 주문 클릭 🎈{' '}
			</Button>
		</div>
	);
}

export default Start;

const Button = styled.button`
	width: 200px;
	height: 60px;
	font-size: 20px;
	background-color: ${({ theme }) => theme.lightColor?.blue.background};
	margin: 10px;
`;
