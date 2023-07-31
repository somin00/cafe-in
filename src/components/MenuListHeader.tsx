import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { darkTheme, defaultTheme } from '../style/theme';

function MenuListHeader() {
	const [activeBtn, setActiveBtn] = useState<string | null>(null);
	const navigate = useNavigate();
	return (
		<Layout>
			<li>
				<h1>
					<img src="/assets/logo.png" alt="cafe-in" width={90} />
				</h1>
			</li>
			<TabButton $isActive={activeBtn === '커피'} onClick={() => setActiveBtn('커피')}>
				커피
			</TabButton>
			<TabButton $isActive={activeBtn === '음료'} onClick={() => setActiveBtn('음료')}>
				음료
			</TabButton>
			<TabButton $isActive={activeBtn === '티'} onClick={() => setActiveBtn('티')}>
				티
			</TabButton>
			<TabButton $isActive={activeBtn === '디저트'} onClick={() => setActiveBtn('디저트')}>
				디저트
			</TabButton>
			<li>
				<button>
					<img src="/assets/user/home_light.svg" alt="Home" width={30} onClick={() => navigate('/')} />
				</button>
			</li>
		</Layout>
	);
}
//prettier-ignore
const TabButton = styled.button<{ $isActive: boolean }>`
	background-color: transparent;
	font-size: ${({ theme }) => theme.fontSize['2xl']};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	padding: 10px 30px;
	width: fit-content;
	border: none;
	border-radius: 10px;
	cursor: pointer;
background-color: ${props => (props.$isActive ? props.theme.textColor.lightgray : "transparent")};
	color: ${props => (props.$isActive ? (props.theme === defaultTheme ? props.theme.lightColor?.yellow.sub : darkTheme.darkColor?.sub) : "inherit")};
`;
const Layout = styled.ul`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 83px;
	padding: 0 30px;
	border-bottom: 1px solid ${({ theme }) => theme.textColor.lightgray};
	background-color: ${({ theme }) =>
		theme === defaultTheme ? defaultTheme.textColor.white : darkTheme.textColor.black};
`;

export default MenuListHeader;
