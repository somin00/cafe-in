import React from 'react';
import { styled } from 'styled-components';

function DeleteModal() {
	return (
		<DeleteModalWrapper>
			<p>OOOO을 삭제하시겠습니까?</p>
			<div>
				<button type="button">삭제</button>
				<button type="button">취소</button>
			</div>
		</DeleteModalWrapper>
	);
}

export default DeleteModal;

const DeleteModalWrapper = styled.div`
	width: 896px;
	height: 586px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.textColor.black)};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 10px;

	p {
		font-size: ${({ theme }) => theme.fontSize['3xl']};
		font-weight: ${({ theme }) => theme.fontWeight.regular};
		margin-bottom: 53px;
		color: ${({ theme }) => (theme.lightColor ? theme.textColor.black : theme.textColor.white)};
	}

	button {
		width: 146px;
		height: 57px;
		font-size: ${({ theme }) => theme.fontSize['3xl']};
		font-weight: ${({ theme }) => theme.fontWeight.regular};
		color: ${({ theme }) => theme.textColor.white};
		/* 색상 코드 추가되면 수정 */
		background-color: ${({ theme }) => (theme.lightColor ? theme.lightColor?.yellow.sub : '#068FFF')};
		border-radius: 10px;

		&:first-child {
			margin-right: 16px;
		}
	}
`;
