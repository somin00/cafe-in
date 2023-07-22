import React from 'react';
import { HeadWrapper, ImageContainer, ButtonContainer } from './styles';

function Header() {
	return (
		<HeadWrapper>
			<ImageContainer>
				<img src="/assets/admin/back_light.svg" alt="뒤로가기" />
			</ImageContainer>
			<h1>메뉴관리</h1>
			<ButtonContainer>
				<button type="button">카레고리 관리</button>
				<button type="button">메뉴 추가</button>
			</ButtonContainer>
		</HeadWrapper>
	);
}

export default Header;
