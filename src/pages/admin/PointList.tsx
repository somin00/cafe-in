import React from 'react';
import { styled, useTheme } from 'styled-components';
import { defaultTheme, darkTheme } from '../../style/theme';
import { useNavigate } from 'react-router-dom';

function PointList() {
	const theme = useTheme();
	const navigate = useNavigate();

	return (
		<Layout>
			<Header>
				<img
					className="backBtn"
					src={theme === defaultTheme ? '/assets/user/BackBtn_light.svg' : '/assets/user/BackBtn_dark.svg'}
					alt="메뉴페이지"
					onClick={() => navigate('/admin/main')}
				/>
				<h1>회원 포인트 내역</h1>
			</Header>
			<Container>
				<TotalMember>
					<h2>전체 회원수</h2>
					<p>100명</p>
				</TotalMember>

				<Table>
					<THead>
						<p>전화 번호</p>
						<p>포인트</p>
					</THead>

					<Item>
						<p>010-2323-2323</p>
						<p>1,000</p>
					</Item>
					<Item>
						<p>010-2323-2323</p>
						<p>1,000</p>
					</Item>
					<Item>
						<p>010-2323-2323</p>
						<p>1,000</p>
					</Item>
				</Table>
			</Container>
		</Layout>
	);
}
const Layout = styled.div`
	width: 1194px;
	height: 834px;
	background-color: ${({ theme }) => (theme === defaultTheme ? theme.textColor.white : darkTheme.darkColor.background)};
	overflow-y: hidden;
`;
const Header = styled.div`
	display: flex;
	padding: 10px;
	color: ${({ theme }) => (theme === defaultTheme ? theme.textColor.black : darkTheme.textColor.white)};
	h1 {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: ${({ theme }) => theme.fontSize['3xl']};
	}
`;

const Container = styled.div`
	margin-top: 110px;
	margin-left: 100px;
	margin-right: 100px;
`;
const TotalMember = styled.div`
	width: 339px;
	display: flex;
	justify-content: space-between;
	padding: 20px 30px;
	font-size: ${({ theme }) => theme.fontSize.xl};
	background-color: ${({ theme }) =>
		theme === defaultTheme ? defaultTheme.lightColor.yellow.background : darkTheme.textColor.lightbrown};
	border-radius: 10px;
`;
const Table = styled.div`
	background-color: ${({ theme }) =>
		theme === defaultTheme ? defaultTheme.lightColor.yellow.background : darkTheme.textColor.lightbrown};
	height: 600px;
	border-radius: 10px;
`;
const THead = styled.div`
	width: 100%;
	display: flex;
	margin-top: 30px;
	justify-content: center;
	font-size: ${({ theme }) => theme.fontSize['2xl']};

	p {
		padding: 20px 180px;
	}
`;

const Item = styled.li`
	display: flex;
	justify-content: space-around;
	border-radius: 10px;
	padding: 20px;
	margin: 20px 50px;
	background-color: ${({ theme }) => theme.textColor.white};
`;
export default PointList;
