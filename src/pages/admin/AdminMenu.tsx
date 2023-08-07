import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

function AdminMenu() {
	const navigate = useNavigate();
	return (
		<div>
			<h1>관리자 메뉴</h1>
			<div className="button">
				<Button onClick={() => navigate('/admin/menu')}>메뉴 관리 클릭 💕 </Button>
				<Button onClick={() => navigate('/admin/waiting')}>대기 관리 클릭 💫</Button>
				<Button onClick={() => navigate('/admin/theme')}>테마 관리 클릭 🎠</Button>
			</div>
		</div>
	);
}

export default AdminMenu;

const Button = styled.button`
	width: 200px;
	height: 60px;
	font-size: 20px;
	background-color: #fafad2;
	margin: 10px;
`;
