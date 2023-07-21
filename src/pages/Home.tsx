import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

function Home() {
	const navigate = useNavigate();

	return (
		<div>
			<h1>Home</h1>
			<div className="button">
				<Button onClick={() => navigate('/menu')}>메뉴 주문 클릭 🎈 </Button>
				<Button onClick={() => navigate('/admin/main')}>관리자 메뉴 클릭✨</Button>
				<Button onClick={() => navigate('/waiting')}>대기 신청 클릭 💙</Button>
			</div>
		</div>
	);
}

export default Home;

const Button = styled.button`
	width: 200px;
	height: 60px;
	font-size: 20px;
	background-color: #fafad2;
	margin: 10px;
`;
