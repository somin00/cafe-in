import React from 'react';
import { styled } from 'styled-components';

function Toast() {
	return <ToastWrapper>로그인 후 이용 가능한 서비스입니다.</ToastWrapper>;
}

export default Toast;

const ToastWrapper = styled.div`
	width: 340px;
	height: 50px;
	position: fixed;
	left: 50%;
	top: 38px;
	transform: translateX(-170px);
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor.sub : theme.darkColor.main)};
	border-radius: 20px;
	color: ${({ theme }) => theme.textColor.white};
	font-weight: ${({ theme }) => theme.fontWeight.semibold};
	font-size: ${({ theme }) => theme.fontSize['lg']};
`;
