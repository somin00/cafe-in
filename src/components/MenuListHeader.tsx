import React from 'react';
import { styled } from 'styled-components';

function MenuListHeader() {
	return (
		<Layout>
			<li>
				<h1>
					<img src="/assets/logo.png" alt="cafe-in" width={90} />
				</h1>
			</li>
			<li>
				<button>커피</button>
			</li>
			<li>
				<button>음료</button>
			</li>
			<li>
				<button>티</button>
			</li>
			<li>
				<button>디저트</button>
			</li>
			<li>
				<button>
					<img src="/assets/user/home_light.svg" alt="홈 화면 바로가기" width={30} />
				</button>
			</li>
		</Layout>
	);
}
const Layout = styled.ul`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 83px;
	padding: 0 30px;
	border-bottom: 1px solid ${({ theme }) => theme.textColor.lightgray};
	background-color: ${({ theme }) => theme.textColor.white};
`;
export default MenuListHeader;
