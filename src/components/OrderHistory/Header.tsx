import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Header() {
	const navigate = useNavigate();

	return (
		<>
			<HeadWrapper>
				<ImageContainer
					onClick={() => {
						navigate(-1);
					}}
				>
					<img alt="뒤로가기" />
				</ImageContainer>
				<h1>주문 내역</h1>
				<ButtonContainer>
					<button type="button" className="is-selected">
						진행중
					</button>
					<button type="button">완료주문</button>
				</ButtonContainer>
			</HeadWrapper>
		</>
	);
}

export default Header;

const HeadWrapper = styled.header`
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.darkColor?.background)};
	height: 80px;
	display: flex;
	align-items: center;

	h1 {
		font-size: ${({ theme }) => theme.fontSize['4xl']};
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
		color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
		margin: 0 227px 0 449px;
	}
`;

const ImageContainer = styled.button`
	margin-left: 33px;
	width: 60px;
	img {
		content: ${({ theme }) =>
			theme.lightColor ? 'url(/assets/admin/back_light.svg)' : 'url(/assets/admin/back_dark.svg)'};
	}
`;

const ButtonContainer = styled.div`
	button {
		width: 140px;
		height: 56px;
		border-radius: 10px;
		font-size: ${({ theme }) => theme.fontSize['2xl']};
		font-weight: ${({ theme }) => theme.fontWeight.medium};
		background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.darkColor?.background)};
		border: ${({ theme }) => (theme.lightColor ? theme.lightColor?.yellow.point : theme.textColor.darkgray)} 1px solid;
		color: ${({ theme }) => (theme.lightColor ? theme.lightColor?.yellow.point : theme.textColor.darkgray)};

		&:first-child {
			margin-right: 6px;
		}

		&.is-selected {
			background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor?.yellow.point : theme.textColor.white)};
			color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.textColor.black)};
		}
	}
`;
