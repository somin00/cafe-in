import React from 'react';
import { styled } from 'styled-components';
import ManagementHeader from '../../components/adminMode/ManagementHeader';

function ThemeManagement() {
	return (
		<ThemeManagementWrapper>
			<ManagementHeader headerText="테마 및 색상 설정" />
			<ColorWrapper>
				<h2>색상 변경</h2>
				<Colors />
			</ColorWrapper>
			<ModeWrapper>
				<LightModeWrapper>
					<h2>라이트 모드</h2>
					<LightMode />
				</LightModeWrapper>
				<DarkModeWrapper>
					<h2>다크 모드</h2>
					<DarkMode />
				</DarkModeWrapper>
			</ModeWrapper>
		</ThemeManagementWrapper>
	);
}

export default ThemeManagement;

const ThemeManagementWrapper = styled.div`
	width: 1194px;
	height: 834px;
	background-color: ${({ theme }) => (theme.lightColor ? theme.textColor.white : theme.darkColor?.background)};
	user-select: none;
`;

const ColorWrapper = styled.div``;
const Colors = styled.div``;
const ModeWrapper = styled.div``;
const LightModeWrapper = styled.div``;
const LightMode = styled.div``;
const DarkModeWrapper = styled.div``;
const DarkMode = styled.div``;
