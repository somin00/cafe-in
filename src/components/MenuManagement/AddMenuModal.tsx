import React from 'react';
import styled from 'styled-components';
import ModalInput from './ModalInput';
function AddMenuModal() {
	return (
		<AddModalWrapper>
			<ModalInput />
			<div>
				<Button type="button">추가</Button>
				<Button type="button">취소</Button>
			</div>
		</AddModalWrapper>
	);
}

export default AddMenuModal;

const AddModalWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 896px;
	height: 586px;
	background-color: ${({ theme }) => theme.lightColor?.yellow.background};
	padding-top: 58px;
	border-radius: 10px;
`;

const Button = styled.button`
	width: 146px;
	height: 57px;
	background-color: ${({ theme }) => theme.lightColor?.yellow.sub};
	border-radius: 10px;
	font-size: ${({ theme }) => theme.fontSize['3xl']};
	font-weight: ${({ theme }) => theme.fontWeight.regular};
	color: ${({ theme }) => theme.textColor.white};

	&:first-child {
		margin-right: 24px;
	}
`;
