import React from 'react';
import styled from 'styled-components';

function ModalInput() {
	// props 전달 내용이 있다면 수정 모달
	return (
		<ModalInputWrapper>
			<fieldset>
				<legend>about Beverage</legend>
				<ImageContainer>
					<img src="" alt="" />
					<label htmlFor="file">이미지 등록하기</label>
					<input type="file" name="file" id="file"></input>
				</ImageContainer>
				<InputList>
					<li>
						<label htmlFor="name">메뉴명</label>
						<input type="text" id="name" />
					</li>
					<li>
						<label htmlFor="price">금액</label>
						<input type="text" id="price" />
					</li>
					<li>
						<label htmlFor="category">카테고리</label>
						<input type="text" id="category" />
					</li>
					<li>
						<InventoryButton type="button" className="is-selected">
							재고있음
						</InventoryButton>
						<InventoryButton type="button">품절</InventoryButton>
					</li>
				</InputList>
			</fieldset>
		</ModalInputWrapper>
	);
}

export default ModalInput;

const ModalInputWrapper = styled.form`
	margin-bottom: 37px;
	fieldset {
		display: flex;
	}

	legend {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: polygon(0 0, 0 0, 0 0);
	}
`;

const ImageContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-right: 90px;

	img {
		width: 273px;
		height: 350px;
		margin-bottom: 22px;
	}

	label {
		font-size: ${({ theme }) => theme.fontSize['2xl']};
		font-weight: ${({ theme }) => theme.fontWeight.regular};
		cursor: pointer;
	}

	input {
		display: none;
	}
`;

const InputList = styled.ul`
	li {
		margin-bottom: 33px;
	}

	li:last-child {
		margin-left: 117px;
	}

	label {
		display: inline-block;
		width: 109px;
		text-align: right;
		font-size: ${({ theme }) => theme.fontSize['3xl']};
		font-weight: ${({ theme }) => theme.fontWeight.regular};
		margin-right: 8px;
	}

	input {
		width: 291px;
		height: 66px;
		border: none;
		border-radius: 10px;
	}
`;

const InventoryButton = styled.button`
	width: 136px;
	height: 50px;
	background-color: ${({ theme }) => theme.textColor.lightbrown};
	border-radius: 10px;
	font-size: ${({ theme }) => theme.fontSize['2xl']};
	font-weight: ${({ theme }) => theme.fontWeight.regular};

	&:first-child {
		margin-right: 15px;
	}

	&.is-selected {
		background-color: ${({ theme }) => theme.lightColor?.yellow.main};
	}
`;
