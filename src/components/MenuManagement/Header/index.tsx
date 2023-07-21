import React from 'react';
import { Head, ImageContainer } from './styles';

function Header() {
	return (
		<Head>
			<ImageContainer>
				<img src="/assets/admin/back_light.svg" alt="뒤로가기" />
			</ImageContainer>
			<h1>메뉴관리</h1>
			<div>
				<button type="button">카레고리 관리</button>
				<button type="button">메뉴 추가</button>
			</div>
		</Head>
	);
}

export default Header;
