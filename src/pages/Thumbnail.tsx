import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

function Thumbnail() {
	const navigate = useNavigate();
	return (
		<ThumbnailWrapper>
			<h1>시작 페이지</h1>
			<Button onClick={() => navigate('/start')}>매장 vs 테이크아웃</Button>
			<Button
				onClick={() => {
					navigate('/admin/main');
				}}
			>
				관리자 모드 🎈
			</Button>
		</ThumbnailWrapper>
	);
}

export default Thumbnail;

const ThumbnailWrapper = styled.div`
	width: 1194px;
	height: 834px;
	background-color: ${({ theme }) => theme.textColor.lightBeige};
`;

const Button = styled.button`
	width: 200px;
	height: 60px;
	font-size: 20px;
	background-color: ${({ theme }) => theme.lightColor?.blue.background};
	margin: 10px;
`;
