import React from 'react';
import styled from 'styled-components';

function AdminLogin() {
	return (
		<AdminLoginWrapper>
			<img src="/assets/logo.png" alt="카페인 로고" width="100" height="100" />
			<div>
				<h1>관리자 로그인</h1>
				<FormWrapper>
					<form>
						<label htmlFor="password">비밀번호</label>
						<input type="password" id="password" placeholder="비밀번호를 입력해주세요." />
					</form>
					<button type="button">로그인하기</button>
				</FormWrapper>
			</div>
		</AdminLoginWrapper>
	);
}

export default AdminLogin;

const AdminLoginWrapper = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 1194px;
	height: 100vh;
	background-color: ${({ theme }) => theme.textColor.white};

	img {
		position: absolute;
		top: 10px;
		left: 10px;
	}
	h1 {
		font-size: ${({ theme }) => theme.fontSize['4xl']};
		font-weight: ${({ theme }) => theme.fontWeight.semibold};
		margin-bottom: 20px;
	}
`;

const FormWrapper = styled.div`
	width: 567px;
	height: 333px;
	background-color: ${({ theme }) =>
		theme.lightColor ? theme.lightColor.yellow.background : theme.darkColor?.background};
	border-radius: 15px;
	border: ${({ theme }) => theme.textColor.lightgray} 1px solid;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 100px;

	label {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: polygon(0 0, 0 0, 0 0);
	}

	input {
		width: 408px;
		height: 65px;
		padding-left: 14px;
		border-radius: 20px;
		border: ${({ theme }) => theme.textColor.lightgray} 1px solid;
		margin-bottom: 26px;

		&::placeholder {
			font-size: ${({ theme }) => theme.fontSize['2xl']};
			font-weight: ${({ theme }) => theme.fontWeight.bold};
		}
	}

	button {
		width: 175px;
		height: 54px;
		background-color: ${({ theme }) => theme.lightColor?.yellow.main};
		border-radius: 20px;
		color: ${({ theme }) => theme.textColor.white};
		font-size: ${({ theme }) => theme.fontSize['2xl']};
		font-weight: ${({ theme }) => theme.fontWeight.bold};
	}
`;
