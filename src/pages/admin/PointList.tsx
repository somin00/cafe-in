import React, { useEffect, useState } from 'react';
import { styled, useTheme } from 'styled-components';
import { defaultTheme, darkTheme } from '../../style/theme';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

function underBarPhoneNumber(phoneNumber: string): string {
	const cleaned = ('' + phoneNumber).replace(/\D/g, ''); // 숫자만 남기기
	const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/); // 정규표현식 사용하여 매칭
	if (match) {
		return [match[1], match[2], match[3]].join('-');
	}
	return phoneNumber;
}

function PointList() {
	const theme = useTheme();
	const navigate = useNavigate();
	const [points, setPoints] = useState<any[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 6;

	useEffect(() => {
		const fetchPoints = async () => {
			const pointsCollection = collection(db, 'point');
			const pointsSnapshot = await getDocs(pointsCollection);
			const pointsData = pointsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
			setPoints(pointsData);
		};

		fetchPoints();
	}, []);
	// 전체 페이지 수
	const totalPages = Math.ceil(points.length / itemsPerPage);

	// 현재 페이지의 항목 선택
	const currentItems = points.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
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
					<p>{points.length}명</p>
				</TotalMember>
				<Table>
					<THead>
						<p>전화 번호</p>
						<p>포인트</p>
					</THead>
					{currentItems.map((point) => (
						<Item key={point.id}>
							<p>{underBarPhoneNumber(point.phoneNumber)}</p>
							<p>{point.point.toLocaleString()}</p>
						</Item>
					))}

					<Pagination>
						<button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>이전</button>
						{Array.from({ length: totalPages }).map((_, index) => (
							<button key={index} onClick={() => setCurrentPage(index + 1)}>
								{index + 1}
							</button>
						))}
						<button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>다음</button>
					</Pagination>
				</Table>
			</Container>
		</Layout>
	);
}
const Layout = styled.div`
	width: 1194px;
	height: 834px;
	background-color: ${({ theme }) => (theme === defaultTheme ? theme.textColor.white : darkTheme.darkColor.background)};
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
	height: 580px;
	border-radius: 10px;
	position: relative;
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
const Pagination = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	bottom: 15px;
	left: 400px;
	button {
		margin: 0 5px;
		padding: 5px 10px;
		cursor: pointer;
	}
`;

export default PointList;
