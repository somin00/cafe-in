import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { selectedModeState } from '../state/Mode';
import { defaultTheme } from '../style/theme';

function Home() {
	const navigate = useNavigate();
	const setMode = useSetRecoilState(selectedModeState);

	return (
		<div>
			<h1>Home</h1>
			<div className="button">
				<Button
					onClick={() => {
						setMode('user');
						navigate('/menu');
					}}
				>
					메뉴 주문 클릭 🎈{' '}
				</Button>
				<Button
					onClick={() => {
						setMode('admin');
						navigate('/admin/main');
					}}
				>
					관리자 메뉴 클릭✨
				</Button>
				<Button
					onClick={() => {
						setMode('admin');
						navigate('/waiting');
					}}
				>
					대기 신청 클릭 💙
				</Button>
			</div>
		</div>
	);
}

export default Home;

const Button = styled.button`
	width: 200px;
	height: 60px;
	font-size: 20px;
	background-color: ${({ theme }) => defaultTheme.lightColor.blue.background};
	margin: 10px;
`;
